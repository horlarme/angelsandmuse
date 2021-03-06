<?php

error_reporting(0);

require_once 'products.php';

if (!$_POST)
    exit;

// Email address verification, do not edit.
function isEmail($email) {
    return (preg_match("/^[-_.[:alnum:]]+@((([[:alnum:]]|[[:alnum:]][[:alnum:]-]*[[:alnum:]])\.)+(ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$/i", $email));
}

if (!defined("PHP_EOL"))
    define("PHP_EOL", "\r\n");

$name = $_POST['name'];
$email = $_POST['email'];
$comments = $_POST['comments'];
$mobile = $_POST['mobile'];
$type = $_POST['type'];
$price = explode(",", $_POST['price']);
$price = $prod[$price[0]][$price[1]];$seats = $_POST['period'];
$datefrom = $_POST['datefrom'] . " " . $_POST['timefrom'];
$code = $_REQUEST['coupon'];

if (trim($name) == '') {
    echo '<div class="error_message">Enter your name.</div>';
    exit();
} else if (trim($email) == '') {
    echo '<div class="error_message">Enter a valid email address.</div>';
    exit();
} else if (trim($mobile) == '') {
    echo '<div class="error_message">Enter a valid phone number.</div>';
    exit();
} else if (!isEmail($email)) {
    echo '<div class="error_message">You have enter an invalid e-mail address, try again.</div>';
    exit();
} else if (trim($seats) == '') {
    $seats = 1;
} else if (trim($datefrom) == '') {
    echo '<div class="error_message">Enter date from.</div>';
    exit();
}

if (get_magic_quotes_gpc()) {
    $comments = stripslashes($comments);
}


// Configuration option.
// Enter the email address that you want to emails to be sent to.
// Example $address = "joe.doe@yourdomain.com";

$address = "info@angelsandmuse.com";


// Configuration option.
// i.e. The standard subject will appear as, "You've been contacted by John Doe."
// Example, $e_subject = '$name . ' has contacted you via Your Website.';

$e_subject = 'Someone booked a slot.';

/**
 * Coupon
 */
$coupon = curl_init();

curl_setopt_array($coupon, array(
    CURLOPT_URL => "http://admin.angelsandmuse.com/coupons/get_discount/" . $code . "/{$email}.json",
//    CURLOPT_URL => "http://localhost:8765/coupons/get_discount/" . $code . "/{$email}.json",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST"
));

$response = json_decode(curl_exec($coupon));


if($response->coupon > 0){
    $today = date('Y-m-d') . 'T00:00:00+00:00';
    $discount = $response->coupon[0]->discount;
    $couponID = $response->coupon[0]->id;
    if($response->coupon[0]->start >= $today){
        $discount = 0;
    }
    if($response->coupon[0]->end <= $today){
        $discount = 0;
    }
    if($response->isUsed){
        $discount = 0;
    }else{
        
        $markUsed = curl_init();
        
        curl_setopt_array($markUsed, array(
            CURLOPT_URL => "http://admin.angelsandmuse.com/couponsUsed/mark_as_used/{$email}/{$couponID}.json",
//            CURLOPT_URL => "http://localhost:8765/couponsUsed/mark_as_used/{$email}/{$couponID}.json",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => "POST"
        ));
        
    }
}else{
    $discount = 0;
}
//exit;
/**
 * Dealing with the total price
 */
$totalPayWithoutDiscount = ($price['price'] * $seats);

$totalPayWithDiscount = $totalPayWithoutDiscount - (($discount / 100) * $totalPayWithoutDiscount);

// Configuration option.
// You can change this if you feel that you need to.
// Developers, you may wish to add more fields to the form, in which case you must be sure to add them here.

$e_body = "A new booking has been made with the below informations:" . PHP_EOL . PHP_EOL;
$e_body .= "Full Name: {$name}" . PHP_EOL . PHP_EOL;
$e_body .= "E-Mail: {$email}" . PHP_EOL . PHP_EOL;
$e_body .= "Mobile: {$mobile}" . PHP_EOL . PHP_EOL;
$e_body .= "Type: {$type}" . PHP_EOL . PHP_EOL;
if ($discount > 0) {
    $e_body .= "Discount Code: {$code}" . PHP_EOL . PHP_EOL;
}
$e_body .= "Space: {$price['name']}" . PHP_EOL . PHP_EOL;
$e_body .= "Price: " . number_format($totalPayWithoutDiscount, 2) . PHP_EOL . PHP_EOL;
$e_body .= "Date: {$datefrom}" . PHP_EOL . PHP_EOL;
$e_content = "Message:\r\n$comments" . PHP_EOL . PHP_EOL;

$msg = wordwrap($e_body . $e_content, 70);

$headers = "From: no-reply@angelsandmuse.com" . PHP_EOL;
$headers .= "MIME-Version: 1.0" . PHP_EOL;
$headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

try {
    mail($address, $e_subject, $msg, $headers);

    $curl = curl_init();

    $new_amount = $totalPayWithDiscount * 100;

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.paystack.co/transaction/initialize",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode([
            'amount' => $new_amount,
            'email' => $email
        ]),
        CURLOPT_HTTPHEADER => [
            "authorization: Bearer sk_test_6f86b9efb375a9a52326eb46e56c5e03ea308711",
            "content-type: application/json",
            "cache-control: no-cache"
        ],
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    if ($err) {
        echo $err . "<br /><br />";
        // there was an error contacting the Paystack API
        echo 'Please refresh this page';
        exit();
    }

    $tranx = json_decode($response);

    if (!$tranx->status) {
        // there was an error from the API
        echo 'API returned error: ' . $tranx->message;
        exit();
    }

// redirect to page so User can pay
    header('Location: ' . $tranx->data->authorization_url);
} catch (\Exception $e) {
    echo "Please refresh this page";
    exit();
}