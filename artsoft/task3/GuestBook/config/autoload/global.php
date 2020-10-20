<?php

use Doctrine\DBAL\Driver\PDOMySql\Driver as PDOMySqlDriver;

return [
  'doctrine' => [
      'connection' => [
          'orm_default' => [
              'driverClass' => PDOMySqlDriver::class,
              'params' => [
                  'host'     => '127.0.0.1',                    
                  'user'     => 'test',
                  'password' => 'qwerty12',
                  'dbname'   => 'test',
              ]
          ],            
      ],        
  ],
];
