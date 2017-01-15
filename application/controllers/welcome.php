<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$json = $this->loadjson();
		//echo $json;
		$data = array (
	            'a_data' => $json
	    );
		$this->load->view('dashboard', $data);
	}

	public function loadjson(){
		$str = file_get_contents('./test.json', true);
		//echo $str;
		$json = json_encode($str, true);
		//echo $json;
		return $json;
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */