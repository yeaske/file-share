let shs_iframe = document.getElementById("Repair Scheduler iframe");
if (shs_iframe) {
    let iframe_endpoint = "https://www.sears.com/shs/orders/tracker";
    let url_string = window.location.href;
    let url = new URL(url_string);
    console.log(url_string);
    let order_number = url.searchParams.get("order_number");
    if (order_number) {
        console.log(order_number);
        order_number_new = order_number.split('-').reverse().join('');
        console.log(order_number_new);
        let phone_number = url.searchParams.get("phone_number");
        if (!phone_number) {
            phone_number = "0000000000"
        }
        console.log(phone_number);
        let finalURL = iframe_endpoint + "?phone_number=" + phone_number + "&order_number=" + order_number_new;
        console.log(finalURL);
        shs_iframe.src = finalURL;
    } else {
        let finalURL = iframe_endpoint;
        console.log(finalURL);
        shs_iframe.src = finalURL;
    }
}
