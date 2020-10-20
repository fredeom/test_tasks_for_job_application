<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="note")
 */
class Note {
  /**
   * @ORM\Id
   * @ORM\GeneratedValue
   * @ORM\Column(name="id")
   */
  protected $id;
  /**
   * @ORM\Column(name="nickname")
   */
  protected $nickname;
  /**
   * @ORM\Column(name="date_created")
   */
  protected $dateCreated;
  /**
   * @ORM\Column(name="msg")
   */
  protected $msg;
  /**
   * @ORM\Column(name="img")
   */
  protected $img;

  public function setId($id) {$this->id = $id; }
  public function getId() { return $this->id; }
  
  public function setNickname($nickname) {$this->nickname = $nickname; }
  public function getNickname() { return $this->nickname; }

  public function setDateCreated($dateCreated) {$this->dateCreated = $dateCreated; }
  public function getDateCreated() { return $this->dateCreated; }

  public function setMsg($msg) {$this->msg = $msg; }
  public function getMsg() { return $this->msg; }

  public function setImg($img) {$this->img = $img; }
  public function getImg() { return $this->img; }
}

?>