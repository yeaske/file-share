/**
 * @author Arun Suresh <arun.sureshkumar@transformco.com>
 *     Handle all forms of order numbers in page urls, extract it and modify the iframe end point.
 */
let shs_iframe_id = document.getElementById("Repair Scheduler iframe");
if (shs_iframe_id) {
    // When order number is available.
    let iframe_endpoint = "https://www.sears.com/shs/orders/appointment";
    // default when no order number is available.
    let finalURL = "https://www.sears.com/shs/orders/lookup";
    let url_string = window.location.href;
    let url = new URL(url_string);
    let order_number = url.searchParams.get("order_number");
    if (order_number) {
        console.log('param order number: ' + order_number);
        order_number_new = order_number.split('-').reverse().join('');
        let phone_number = url.searchParams.get("phone_number");
        if (!phone_number) {
            phone_number = "0000000000";
        }
        let finalURL = iframe_endpoint + "?phone_number=" + phone_number + "&order_number=" + order_number_new;
        console.log('final url: ' + finalURL);
        shs_iframe_id.src = finalURL;
    } else {
        let order_number_match = url_string.match(/.*\/([-0-9]+)/i);
        if (order_number_match) {
            order_number = order_number_match[1];
        } else {
            order_number = null;
        }
        if (order_number) {
            console.log('slug order number: ' + order_number);
            order_number_new = order_number.split('-').reverse().join('');
            phone_number = "0000000000";
            finalURL = iframe_endpoint + "?order_number=" + order_number_new + "&phone_number=" + phone_number
            console.log('final url: ' + finalURL);
            shs_iframe_id.src = finalURL;
        } else {
            console.log('No order number available.');
            console.log(finalURL);
            shs_iframe_id.src = finalURL;
        }

    }
}
