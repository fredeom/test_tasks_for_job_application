<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

use Doctrine\ORM\EntityManager;

use Application\Entity\Note;
use Application\Form\NoteForm;

class IndexController extends AbstractActionController {
  protected $entityManager;
  public function __construct(EntityManager $entityManager) {
    $this->entityManager = $entityManager;
  }

  public function indexAction() {
    $notes = $this->entityManager->getRepository(Note::class)->findAll();
    return new ViewModel(['notes' => $notes]);
  }
  public function addAction() {
    $form = new NoteForm();
    $form->get('submit')->setValue('Добавить');

    $request = $this->getRequest();

    if (! $request->isPost()) { return ['form' => $form]; }
    
    $request = $this->getRequest();
    $data = array_merge_recursive(
      $request->getPost()->toArray(),
      $request->getFiles()->toArray()
    );
    $form->setData($data);
    
    if (! $form->isValid()) { return ['form' => $form]; }

    $data = $form->getData();
    $note = new Note();
    $note->setNickname($data['nickname']);
    $note->setMsg($data['msg']);
    $note->setDateCreated(date("Y-m-d H:i:s"));
    ///////// dirty image scaling /////////
    $filePath = $data["file"]["tmp_name"];
    if (is_readable($filePath)) {
      $desiredWidth = 150;
      list($originalWidth, $originalHeight) = getimagesize($filePath);
      $aspectRatio = $originalWidth / $originalHeight;
      $desiredHeight = $desiredWidth / $aspectRatio;
      
      $fileSize = filesize($filePath);
      $finfo = finfo_open(FILEINFO_MIME);
      $mimeType = finfo_file($finfo, $filePath);
      if($mimeType===false) $mimeType = 'application/octet-stream';
      $fileInfo = ['size' => $fileSize, 'type' => $mimeType];
      $resultingImage = imagecreatetruecolor($desiredWidth, $desiredHeight);
      if (substr($fileInfo['type'], 0, 9) =='image/png') {
        $imageType = 'image/png';
        $originalImage = imagecreatefrompng($filePath);
      } else {
        $imageType = 'image/jpeg';
        $originalImage = imagecreatefromjpeg($filePath);
      }
      print_r("fileSize=$fileSize");
      imagecopyresampled($resultingImage, $originalImage, 0, 0, 0, 0, 
        $desiredWidth, $desiredHeight, $originalWidth, $originalHeight);
      $tmpFileName = tempnam("/tmp", "FOO");
      imagejpeg($resultingImage, $tmpFileName, 80);
      print_r($tmpFileName);
      $imageData = base64_encode(file_get_contents($tmpFileName));
      $src = 'data: '.mime_content_type($tmpFileName).';base64,'.$imageData;
      $note->setImg($src);
    }
    ///////////////////////////////////////
    $this->entityManager->persist($note);
    $this->entityManager->flush();

    return $this->redirect()->toRoute('note');
  }
  public function editAction() {
    $form = new NoteForm();
    $form->get('submit')->setValue('Приминить изменения');
    $noteId = $this->params()->fromRoute('id', 0);
    $note = $this->entityManager->getRepository(Note::class)->findOneById($noteId);
    if ($note == null) {
      $this->getResponse()->setStatusCode(404);
      return;                        
    }
    if ($this->getRequest()->isPost()) {
      $data = $this->params()->fromPost();
      $form->setData($data);
      if ($form->isValid()) {
        $data = $form->getData();

        $note->setNickname($data['nickname']);
        $note->setMsg($data['msg']);
        $note->setDateCreated(date("Y-m-d H:i:s"));
        $this->entityManager->flush();

        return $this->redirect()->toRoute('note');
      }
    } else {
      $data = [
        'id' => $note->getId(),
        'nickname' => $note->getNickname(),
        'msg' => $note->getMsg(),
      ];
      $form->setData($data);
    }
    return new ViewModel([
      'form' => $form,
      'id' => $note->getId()
    ]);
  }
  public function deleteAction() {
    $id = (int) $this->params()->fromRoute('id', 0);
    if (!$id) {
      return $this->redirect()->toRoute('note');
    }

    $request = $this->getRequest();
    if ($request->isPost()) {
      $del = $request->getPost('del', 'No');

      if ($del == 'Yes') {
        $id = (int) $request->getPost('id');
        $this->entityManager->remove($this->entityManager->find(Note::class, $id));
        $this->entityManager->flush();
      }

      return $this->redirect()->toRoute('note');
    }

    return [
      'id' => $id,
      'note' => $this->entityManager->find(Note::class, $id),
    ];
  }
}
