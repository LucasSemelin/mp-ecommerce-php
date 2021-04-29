<?php
// SDK de Mercado Pago
require __DIR__ .  '/vendor/autoload.php';
// Agrega credenciales
MercadoPago\SDK::setAccessToken('APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398');
?>

<?php
// Crea un objeto de preferencia
$preference = new MercadoPago\Preference();

// Crea un ítem en la preferencia
$item = new MercadoPago\Item();
$item->title = $_POST['title'];
$item->quantity = $_POST['unit'];
$item->unit_price = $_POST['price'];
$preference->items = array($item);

$payer = new MercadoPAgo\Payer();
$payer->name = "Lalo";
$payer->surname = "Landa";
$payer->email = "lucassemelin@gmail.com";
$payer->phone->area_code = "11";
$payer->phone->number = "22223333";
$payer->address->street_name = "False";
$payer->address->street_number = 123;
$payer->address->zip_code = "1111";

$preference->payer = $payer;

$preference->back_urls = array(
    "success" => "https://lucassemelin-mp-commerce-php.herokuapp.com/feedback",
    "failure" => "https://lucassemelin-mp-commerce-php.herokuapp.com/feedback", 
    "pending" => "https://lucassemelin-mp-commerce-php.herokuapp.com/feedback"
);
$preference->auto_return = "approved"; 

$preference->save();
?>