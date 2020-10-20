<?php

namespace Application\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;

class NoteForm extends Form {
  public function __construct($name = null) {
    parent::__construct('note');

    $this->setAttribute('method', 'post');
    $this->setAttribute('enctype', 'multipart/form-data');

    $this->add([
      'name' => 'id',
      'type' => 'hidden',
    ]);
    $this->add([
      'name' => 'nickname',
      'type' => 'text',
      'options' => [
        'label' => 'Никнейм',
      ],
    ]);
    $this->add([
      'name' => 'msg',
      'type' => 'text',
      'options' => [
        'label' => 'Сообщение',
      ]
    ]);
    $this->add([
      'type'  => 'file',
      'name' => 'file',
      'attributes' => [                
          'id' => 'file'
      ],
      'options' => [
          'label' => 'Картинка',
      ],
    ]);
    $this->add([
      'name' => 'submit',
      'type' => 'submit',
      'attributes' => [
        'value' => 'Вперёд',
        'id' => 'submitbutton',
      ],
    ]);

    $inputFilter = new InputFilter();   
    $this->setInputFilter($inputFilter);
    $inputFilter->add([
      'type'     => 'Zend\InputFilter\FileInput',
      'name'     => 'file',
      'required' => false,   
      'validators' => [
        ['name' => 'FileUploadFile'],
        [
          'name' => 'FileMimeType',                        
          'options' => [                            
            'mimeType'  => ['image/jpeg', 'image/png']
          ]
        ],
        ['name' => 'FileIsImage'],
        [
          'name' => 'FileImageSize',
          'options' => [
            'minWidth'  => 128,
            'minHeight' => 128,
            'maxWidth'  => 4096,
            'maxHeight' => 4096
          ]
        ],
      ],
      'filters'  => [                    
        [
          'name' => 'FileRenameUpload',
          'options' => [  
            'target' => './data/upload',
            'useUploadName' => true,
            'useUploadExtension' => true,
            'overwrite' => true,
            'randomize' => false
          ]
        ]
      ],
    ]);
  }
}

?>
