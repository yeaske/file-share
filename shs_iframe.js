/**
 * @author Arun Suresh <arun.sureshkumar@transformco.com>
 *     Handle all forms of order numbers in page urls, extract it and modify the iframe end point.
 *     [02/07/2022][Arun] Pass url params from Repair_Scheduler to shs/scheduler iframe url
 */
let shs_iframe_id = document.getElementById("Repair Scheduler iframe");
if (shs_iframe_id) {
  let url_string = window.location.href;
  let url = new URL(url_string);
  // Pass params to Repair_Scheduler
  if (url.pathname.includes("Repair_Scheduler")) {
    let iframe_scheduler_endpoint = "https://www.sears.com/shs/scheduler";
    finalURL = iframe_scheduler_endpoint + url.search;
    console.log('final url: ' + finalURL);
    shs_iframe_id.src = finalURL;
  } // Scheduler_Order_lookup logic condition
  else if (url.pathname.includes("Scheduler_Order_lookup")) {
    // When order number is available.
    let iframe_appointment_endpoint = "https://www.sears.com/shs/orders/appointment";
    // default when no order number is available.
    let finalURL = "https://www.sears.com/shs/orders/lookup";

    let order_number = url.searchParams.get("order_number");
    if (order_number) {
      console.log('param order number: ' + order_number);
      order_number_new = order_number.split('-').reverse().join('');
      let phone_number = url.searchParams.get("phone_number");
      if (!phone_number) {
        phone_number = "0000000000";
      }
      let finalURL = iframe_appointment_endpoint + "?phone_number=" + phone_number + "&order_number=" + order_number_new;
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
        finalURL = iframe_appointment_endpoint + "?order_number=" + order_number_new + "&phone_number=" + phone_number;
        console.log('final url: ' + finalURL);
        shs_iframe_id.src = finalURL;
      } else {
        console.log('No order number available.');
        console.log(finalURL);
        shs_iframe_id.src = finalURL;
      }
    }
  }
}
