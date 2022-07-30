<?php 
// Connection para sa database
class DbConfig 
{   
    //localhost
     // private $_host = 'localhost';  
     // private $_username = 'root';
     // private $_password = '';
     // private $_database = 'team7.org';

    //live
     private $_host = 'p3plzcpnl485018.prod.phx3.secureserver.net';  
     private $_username = 'lorenz1212';
     private $_password = '@Wdqse1212';
     private $_database = 'team7master2022';

    protected $connection;
    public function __construct()
    {
        if (!isset($this->connection)) {
            
            $this->connection = new mysqli($this->_host, $this->_username, $this->_password, $this->_database);
            
            if (!$this->connection) {
                echo 'Cannot connect to database server';
                exit;
            }            
        }
        return $this->connection;
    }
}
?>


