<?php

namespace Application;

use Zend\ModuleManager\Feature\ConfigProviderInterface;

class Module implements ConfigProviderInterface {
    const VERSION = '3.1.3';

    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }
    
  public function getControllerConfig() {
    return [
      'factories' => [
        Controller\IndexController::class => function($container) {
          $entityManager = $container->get('doctrine.entitymanager.orm_default'); 
          return new Controller\IndexController(
            $entityManager
          );
        },
      ],
    ];
  }
}
