const request = require('request');
const cheerio = require('cheerio');
const XlsxPopulate = require('xlsx-populate');
const e = require('node-each');
// const fs = require('fs');
const url = "https://gtmetrix.com/reports/whatismyip.host/NDrds3Lb";

request(url,function (err,response,html) {
  if (!err) {

    const $ = cheerio.load(html);

    let $page_report_content = $(".page-report-content").children().eq(1).children();

    let $page_report_content_array = [];

    $page_report_content.each(function (index) {

      $page_report_content_array.push($page_report_content.eq(index));

    });

    //-----CODE FOR GETTING URL-------s-//
    console.log("----------Best Of Luck Muneer----------");
    let $report_head = $page_report_content_array[0].children().eq(1).children().eq(1);

    let $report_details_content  = $page_report_content_array[0].children().eq(1).children().eq(2).children("div.report-details-info").children().eq(1).children("div.report-details-value");

    let $url = $report_head.find("a.no-external").text();

    // let $report_info = "";
  let $report_info = $report_details_content.text().trim();

    console.log("Url: "+$url);

    console.log("Location: "+ $report_info);

    //-----CODE FOR GETTING PAGE SPEED SCORE------//
    let Switch = function (ch) {
      switch (ch) {
        case 'sprite-grade-A': return 'A';
                                break;
        case 'sprite-grade-B': return 'B';
                                break;
        case 'sprite-grade-C': return 'C';
                                break;
        case 'sprite-grade-D': return 'D';
                                break;
        case 'sprite-grade-E': return 'E';
                                break;
        case 'sprite-grade-F': return 'F';
                                break;
        default: 'You made a mistake';
        break;

      }
    }
     let $report_score = $page_report_content_array[1].children().eq(0).children().eq(1);

     let $report_score_grade = $report_score.children().eq(0).children().eq(1);

     let $page_score_value = $report_score_grade.find('span.report-score-percent').text();

     let $getclas = $report_score_grade.find('i').attr('class');

     let $page_speed_grade = Switch($getclas);

     let $page_speed_score = $page_speed_grade + $page_score_value;

     console.log("Page Speed Score : "+$page_speed_score);


     //-----------YELLOW SCORE------//
     let $report_Yscore_grade = $report_score.children().eq(1).children().eq(1);

     let $page_Yscore_value = $report_Yscore_grade.find('span.report-score-percent').text();

     let $getYclas = $report_Yscore_grade.find('i').attr('class');

     let $Yslow_speed_grade = Switch($getYclas);

     let $Yslow_speed_score = $Yslow_speed_grade + $page_Yscore_value;

     console.log("Yslow Speed Score: " +$Yslow_speed_score);

    //------------PAGE DETAILS-----------//

    let $page_details = [];

    let $report_page_details = $page_report_content_array[1].children().eq(1).children().eq(1).children();

    $report_page_details.each(function (index) {

      $page_details.push($report_page_details.eq(index).find('span.report-page-detail-value').text());

    });
    let $Full_loaded_time = $page_details[0];
    let $Total_page_size = $page_details[1];
    let $requests = $page_details[2];

    console.log("Full loaded Time: "+$Full_loaded_time);
    console.log("Total page size: "+$Total_page_size);
    console.log("Request: "+$requests);

    //-------------Page Speed Issuess --------------//
    let $report_tabs = $page_report_content_array[2].children().eq(1).children("div").children(".layout-cols-content").children("table").children("tbody");
    let $page_speed_array = [];
    let $page_speed = "";
    let $rule_name,$rule_grade;

    $report_tabs.children("tr").each(function (index) {

    $rule_name = $report_tabs.children().eq(index).children("td.rules-name").closest(".rules-name").find("a").text();


    if($rule_name !== ""){
        $rule_grade = $report_tabs.children().eq(index).children("td.rules-grade").find('div').attr("class");

          if(!($rule_grade.includes("grade-meter-A"))){
              $page_speed_array.push($rule_name);
            }
          }

         });

         $page_speed = $page_speed_array;

         let $page_speed_s = $page_speed.toString();
         console.log("Page Speed: "+ $page_speed);
      //---------------------YSLOW_SPEED------------------//

      let $Yreport_tabs = $page_report_content_array[2].children().eq(2).children("div").children(".layout-cols-content").children("table").children("tbody");
      let $Yslow_speed_array = [];
      let $Yslow_speed = "";
      let $Yrule_name,$Yrule_grade;

        $Yreport_tabs.children("tr").each(function (index) {

        $Yrule_name = $Yreport_tabs.children().eq(index).children("td.rules-name").closest(".rules-name").find("a").text();


           if($Yrule_name !== ""){

           $Yrule_grade = $Yreport_tabs.children().eq(index).children("td.rules-grade").find('div').attr("class");

             if(!($Yrule_grade.includes("grade-meter-A"))){

               $Yslow_speed_array.push($Yrule_name);

             }
           }

          });
          $Yslow_speed = $Yslow_speed_array;
          console.log("YSLow Speed: "+$Yslow_speed);
          let $Yslow_speed_s = $Yslow_speed.toString();
          console.log("----------Congrats! Muneer----------");


        
  }

});
