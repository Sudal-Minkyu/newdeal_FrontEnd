// * 생애주기 의사결정 지원 서비스 자바스크립트 *

// 부재의 따른 세부부재 select box 생성
function absenceSelect(){
    const $absence = $("#absence").val();
    // console.log("absence : "+$absence);
    const $ltAbsenceCode = $("#ltAbsenceCode");
    let html = "";
    if($absence==="plate"){
        html += "<option value='D1'>"+"콘크리트 바닥판"+"</option>";
        html += "<option value='D2'>"+"강 바닥판"+"</option>";
        html += "<option value='D3'>"+"프리스트레스 콘크리트 바닥판"+"</option>";
        html += "<option value='D4'>"+"중공식 콘크리트 바닥판"+"</option>";
        html += "<option value='D5'>"+"중공식 프리스트레스 콘크리트 바닥판"+"</option>";
        html += "<option value='D6'>"+"콘크리트 슬래브"+"</option>";
        html += "<option value='D7'>"+"프리스트레스 콘크리트 슬래브"+"</option>";
        html += "<option value='D8'>"+"중공식 콘크리트 슬래브"+"</option>";
        html += "<option value='D9'>"+"중공식 프리스트레스 콘크리트 슬래브"+"</option>";
    }else{
        html += "<option value='G1'>"+"RC T형 거더"+"</option>";
        html += "<option value='G2'>"+"강 I형 거더"+"</option>";
        html += "<option value='G3'>"+"PSC BOX 거더"+"</option>";
        html += "<option value='G4'>"+"강판형 거더"+"</option>";
        html += "<option value='G5'>"+"프리플렉스 거더"+"</option>";
        html += "<option value='G6'>"+"PSCI 거더"+"</option>";
        html += "<option value='G7'>"+"RC BOX 거더"+"</option>";
        html += "<option value='G8'>"+"ST BOX 거더"+"</option>";
    }
    $ltAbsenceCode.html(html);
}

// 생애주기 이진혁박사 부분 저장
function lifeAllTimeSave(){
    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        if($("#ltBridgeName").val()==="") {
            alertCaution("교량명을 작성해주세요.", 1)
            return false;
        }

        if($("#ltSpanNum").val()==="") {
            alertCaution("경간수를 작성해주세요.", 1)
            return false;
        }

        if($("#ltDamageBRank").val()==="") {
            alertCaution("B등급 손상지수를 작성해주세요.", 1)
            return false;
        }

        if($("#ltDamageCRank").val()==="") {
            alertCaution("C등급 손상지수를 작성해주세요.", 1)
            return false;
        }

        if($("#ltDamageDRank").val()==="") {
            alertCaution("D등급 손상지수를 작성해주세요.", 1)
            return false;
        }

        if($("#ltDamageERank").val()==="") {
            alertCaution("E등급 손상지수를 작성해주세요.", 1)
            return false;
        }

        if($("#ltAllVolume").val()==="") {
            alertCaution("전체물량을 작성해주세요.", 1)
            return false;
        }

        if($("#ltDiscountRate").val()==="") {
            alertCaution("할인율을 작성해주세요.", 1)
            return false;
        }

        if($("#ltIncrease").val()==="") {
            alertCaution("열화증가율을 작성해주세요.", 1)
            return false;
        }

        if($("#ltPeriodicFrequency").val()==="") {
            alertCaution("정기점검 빈도수를 입력해주세요.", 1)
            return false;
        }

        const $ltPeriodicCost = $("#ltPeriodicCost");
        if($ltPeriodicCost.val()==="") {
            alertCaution("정기점검 비용을 입력해주세요.", 1)
            return false;
        }else{
            $ltPeriodicCost.val($ltPeriodicCost.val().replaceAll(",",""));
        }

        if($("#ltCloseFrequency").val()==="") {
            alertCaution("정밀점검 빈도수를 입력해주세요.", 1)
            return false;
        }

        const $ltCloseCost = $("#ltCloseCost");
        if($ltCloseCost.val()==="") {
            alertCaution("정밀점검 비용을 입력해주세요.", 1)
            return false;
        }else{
            $ltCloseCost.val($ltCloseCost.val().replaceAll(",",""));
        }

        if($("#ltSafetyFrequency").val()==="") {
            alertCaution("정밀안전점검 빈도수를 입력해주세요.", 1)
            return false;
        }

        const $ltSafetyCost = $("#ltSafetyCost");
        if($ltSafetyCost.val()==="") {
            alertCaution("정밀안전점검 비용을 입력해주세요.", 1)
            return false;
        }else{
            $ltSafetyCost.val($ltSafetyCost.val().replaceAll(",",""));
        }

        const formData = new FormData(document.getElementById('lifeAllTimeForm'));

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/lifealltime/save"; // 호출할 백엔드 API
        console.log("url : "+url);

        $.ajax({
            url: url,
            type: 'post',
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
                xhr.setRequestHeader("insert_id", insert_id);
            },
            error: function (request) {
                if (request.status === 500) {
                    console.log("request.status : " + request.status + " => 500에러");
                    // alertCaution("500에러 재로그인 해주세요.", 2);
                } else {
                    console.log("request.status : " + request.status + " => 404에러");
                    // alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                console.log("status : " + status);
                if (status === 200) {
                    console.log("저장성공");
                    alertLink(request.sendData.getId);
                    alertSuccess("업로드를 완료했습니다.");
                } else {
                    if (request.err_msg2 === null) {
                        alertCaution(request.err_msg, 1);
                    } else {
                        alertCaution(request.err_msg + "<br>" + request.err_msg2, 1);
                    }
                }
            }
        });
    }
}

// 성공알림창 버튼 누르면 화면이동하는 함수
function alertLink(id) {
    $(document).on("click","#successBtn",function(){
        location.href = "/lifetime/stateoutput/" + id;
        $('#popupId').remove();
    });
}

function lifeAllTimeOutput(id){

    JWT_Get();

    if (accessToken == null || refreshToken == null || insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        console.log("호출성공 id : "+id);

        const params = {
            id : id,
        }

        let url;
        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/lifealltime/output"; // 호출할 백엔드 API
        console.log("url : "+url);

        $.ajax({
            url: url,
            type: 'post',
            data: params,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
            },
            error: function (request) {
                if (request.status === 500) {
                    console.log("request.status : " + request.status + " => 500에러");
                    // alertCaution("500에러 재로그인 해주세요.", 2);
                } else {
                    console.log("request.status : " + request.status + " => 404에러");
                    // alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                console.log("status : " + status);
                if (status === 200) {
                    console.log("아웃풋 호출성공");

                    // console.log("lifeAllTimeDto : " + request.sendData.lifeAllTimeDto);
                    // console.log("periodicCountList : " + request.sendData.periodicCountList);
                    // console.log("closeCountList : " + request.sendData.closeCountList);
                    // console.log("safetyCountList : " + request.sendData.safetyCountList);
                    // console.log("checkCostList : " + request.sendData.checkCostList);
                    // console.log("managementCostList : " + request.sendData.managementCostList);
                    // console.log("ltAbsenceName : " + request.sendData.ltAbsenceName);

                    $('#ltBridgeCode').text(request.sendData.lifeAllTimeDto.ltBridgeCode);
                    $('#ltBridgeName').text(request.sendData.lifeAllTimeDto.ltBridgeName);
                    $('#ltSpanNum').text(request.sendData.lifeAllTimeDto.ltSpanNum);
                    $('#ltAbsenceName').text(request.sendData.ltAbsenceName);

                    const damageRank = request.sendData.lifeAllTimeDto.ltDamageBRank + ', ' + request.sendData.lifeAllTimeDto.ltDamageCRank + ', ' + request.sendData.lifeAllTimeDto.ltDamageDRank + ', ' + request.sendData.lifeAllTimeDto.ltDamageERank;
                    $('#damageRank').text(damageRank);
                    $('#allVolume').text(request.sendData.lifeAllTimeDto.ltAllVolume+'m2');
                    $('#discountRate').text(Number(request.sendData.lifeAllTimeDto.ltDiscountRate*100)+'%');
                    $('#increase').text(Number(request.sendData.lifeAllTimeDto.ltIncrease*100)+'%');

                    $('#ltPeriodicFrequency').text(request.sendData.lifeAllTimeDto.ltPeriodicFrequency);
                    $('#ltPeriodicCost').text(pushComma(request.sendData.lifeAllTimeDto.ltPeriodicCost));
                    $('#ltCloseFrequency').text(request.sendData.lifeAllTimeDto.ltCloseFrequency);
                    $('#ltCloseCost').text(pushComma(request.sendData.lifeAllTimeDto.ltCloseCost));
                    $('#ltSafetyFrequency').text(request.sendData.lifeAllTimeDto.ltSafetyFrequency);
                    $('#ltSafetyCost').text(pushComma(request.sendData.lifeAllTimeDto.ltSafetyCost));

                    const $diagnosisTable = $('#diagnosisTable');
                    let html = "";
                    for(let i=0; i<request.sendData.periodicCountList.length; i++){
                        html += '<tr>';
                            html += '<td>'+Number(i+1)+'</td>';
                            html += '<td style="text-align: center;">'+request.sendData.periodicCountList[i]+'</td>';
                            html += '<td style="text-align: center;">'+request.sendData.closeCountList[i]+'</td>';
                            html += '<td style="text-align: center;">'+request.sendData.safetyCountList[i]+'</td>';
                            html += '<td style="text-align: right;">'+pushComma(Math.round(request.sendData.checkCostList[i]))+'</td>';
                            html += '<td style="text-align: right;">'+pushComma(Math.round(request.sendData.managementCostList[i]))+'</td>';
                        html += '</tr>';
                    }
                    $diagnosisTable.html(html);

                    // console.log("차트 데이터 : "+request.sendData.chartDataList);
                    // amChart
                    am4core.ready(function() { // am4core 시작

                        // 테마설정
                        am4core.useTheme(am4themes_animated);

                        const chart = am4core.create("amChart", am4charts.XYChart);

                        // 날짜 데이터
                        // chart.dateFormatter.dateFormat = "MMM YYYY";
                        // chart.numberFormatter.numberFormat = "#.#a";
                        // chart.numberFormatter.bigNumberPrefixes = [
                        //     { "number": 1e+3, "suffix": "K" },
                        //     { "number": 1e+6, "suffix": "M" },
                        //     { "number": 1e+9, "suffix": "B" }
                        // ];

                        // 차트 제목
                        const title = chart.titles.create();
                        title.text = "유지관리 시나리오 차트";
                        title.fontSize = 25;
                        title.paddingBottom = 8;

                        chart.data = request.sendData.chartDataList;
                        // 차트 데이터 맵으로 가져오면될듯?
                        // chart.data = [
                        //     {
                        //         // "date": new Date(2020, 1, 1),
                        //         "category": 0,
                        //         "maintenance": 1.0,
                        //         "noAction": 1.0,
                        //     },
                        //     {
                        //         "category": 10,
                        //         "maintenance": 0.91,
                        //         "noAction": 0.91,
                        //     },
                        //     {
                        //         "category": 20,
                        //         "maintenance": 0.85,
                        //         "noAction": 0.63,
                        //     },
                        //     {
                        //         "category": 30,
                        //         "maintenance": 0.84,
                        //         "noAction": 0.17,
                        //     },
                        //     {
                        //         "category": 40,
                        //         "maintenance": 0.82,
                        //         "noAction": 0,
                        //     },
                        //     {
                        //         "category": 50,
                        //         "maintenance": 0.80,
                        //         "noAction": 0,
                        //     }, {
                        //         "category": 60,
                        //         "maintenance": 0.78,
                        //         "noAction": 0,
                        //     }, {
                        //         "category": 70,
                        //         "maintenance": 0.80,
                        //         "noAction": 0,
                        //     }, {
                        //         "category": 80,
                        //         "maintenance": 0.64,
                        //         "noAction": 0,
                        //     }, {
                        //         "category": 90,
                        //         "maintenance": 0.29,
                        //         "noAction": 0,
                        //     }, {
                        //         "category": 100,
                        //         "maintenance": 0,
                        //         "noAction": 0,
                        //     }
                        // ];

                        // X축 차트 생성
                        const xAxis = chart.xAxes.push(new am4charts.CategoryAxis);
                        xAxis.dataFields.category = "publicYear";
                        // xAxis.renderer.grid.template.location = 0;
                        xAxis.renderer.minGridDistance = 96; // 범위 조절옵션
                        xAxis.title.text = "공용연수(Years)";
                        xAxis.renderer.grid.template.disabled = true; // x축 라인 제거
                        // xAxis.renderer.labels.template.disabled = true;

                        // Y축 차트 생성
                        const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
                        // valueAxis.renderer.inside = true;
                        // valueAxis.renderer.labels.template.verticalCenter = "bottom";
                        yAxis.title.text = "상태지수(condition Index,C.I)";
                        yAxis.min = 0;
                        yAxis.max = 1;
                        // valueAxis.strictMinMax = true;
                        // valueAxis.renderer.minGridDistance = 20;
                        // valueAxis.adjustLabelPrecision = false;
                        // valueAxis.renderer.labels.template.dx = -5;
                        // valueAxis.renderer.labels.template.dy = 10;
                        // valueAxis.renderer.maxLabelPosition = 0.95;
                        // valueAxis.title.marginRight = 5;

                        // 차트옵션 설정 + 차트설명박스(완)
                        function createSeries(field, name, lineColor,textColor) {
                            const series = chart.series.push(new am4charts.LineSeries());
                            series.dataFields.categoryX = "publicYear";
                            series.dataFields.valueY = field;
                            series.name = name;
                            series.tooltipText = "[bold]{name}[/] \n 공용연수 : [b]{categoryX}년[/] \n 상태지수 : [b]{valueY}[/]";
                            series.strokeWidth = 2;
                            series.smoothing = "monotoneX";
                            series.stroke = lineColor;
                            series.tooltip.getFillFromObject = false;
                            series.tooltip.background.fill = lineColor;
                            series.tooltip.label.fill = textColor;
                            return series;
                        }
                        createSeries("noAction", "무조치시 열화모델", am4core.color("#1c1d66"),am4core.color("#ffffff")); // 무조치시 열화모델 라인색 설정(완)
                        createSeries("preemptive", "선제적 유지관리", am4core.color("#6889e2"),am4core.color("#000000")); // 선제적 유지관리 라인색 설정(완)
                        createSeries("current", "현행 유지관리", am4core.color("#5fee83"),am4core.color("#000000")); // 현행 유지관리 라인색 설정(완)

                        // 점선차트 A~D등급
                        function dashSeries(field,color, dashed) {
                            const series = chart.series.push(new am4charts.LineSeries());
                            series.dataFields.categoryX = "publicYear";
                            series.dataFields.valueY = field;
                            series.strokeWidth = 2;
                            series.smoothing = "monotoneX";
                            series.stroke = color;
                            series.hiddenInLegend = true; // legend 숨기기
                            // 점선 옵션
                            if (dashed) {
                                series.strokeDasharray = "5 3";
                            }
                            return series;
                        }
                        dashSeries("aRank", am4core.color("#ff7979"),true); // A등급 점선 설정(완)
                        dashSeries("bRank", am4core.color("#ff7979"),true); // B등급 점선 설정(완)
                        dashSeries("cRank", am4core.color("#ff7979"),true); // C등급 점선 설정(완)
                        dashSeries("dRank", am4core.color("#ff7979"),true); // D등급 점선 설정(완)

                        chart.legend = new am4charts.Legend(); // 항목 상단 오른쪽으로 배치(완)
                        chart.legend.position = "top";
                        chart.legend.contentAlign = "right";

                        chart.cursor = new am4charts.XYCursor(); // x축y축 생성(완)

                        chart.exporting.menu = new am4core.ExportMenu(); // 오른쪽상단 이미지, 데이터 가져올수있는 형식의 메뉴(완)
                        chart.exporting.menu.items = [{
                            "label": "...",
                            "menu": [
                                {
                                    "label": "Image",
                                    "menu": [
                                        { "type": "png", "label": "PNG" },
                                        { "type": "jpg", "label": "JPG" },
                                        { "type": "svg", "label": "SVG" },
                                        // { "type": "pdf", "label": "PDF" }
                                    ]
                                }, {
                                    "label": "Data",
                                    "menu": [
                                        { "type": "json", "label": "JSON" },
                                        { "type": "csv", "label": "CSV" },
                                        // { "type": "xlsx", "label": "XLSX" },
                                        { "type": "html", "label": "HTML" },
                                        // { "type": "pdfdata", "label": "PDF" }
                                    ]
                                },
                                // {
                                //     "label": "Print", "type": "print"
                                // }
                            ]
                        }];

                    }); // am4core 끝


                } else {
                    if (request.err_msg2 === null) {
                        alertCaution(request.err_msg, 1);
                    } else {
                        alertCaution(request.err_msg + "<br>" + request.err_msg2, 1);
                    }
                }
            }
        });
    }

}


//한글을 지우는 함수
function delHangle(evt){
    var objTarget = evt.srcElement || evt.target;
    var _value = event.srcElement.value;
    if(/[ㄱ-ㅎㅏ-ㅡ가-핳]/g.test(_value)) {
        objTarget.value = null;
    }
}
// 소수점한개로 제한한 실수값입력할수있게하는 함수
function isNumberKey(evt) {
    const charCode = (evt.which) ? evt.which : event.keyCode;
    const _value = event.srcElement.value;
    if (event.keyCode < 48 || event.keyCode > 57) {
        if (event.keyCode !== 46) {
            return false;
        }
    }
    // 소수점(.)이 두번 이상 나오지 못하게
    const _pattern0 = /^\d*[.]\d*$/;
    if (_pattern0.test(_value)) {
        if (charCode === 46) {
            return false;
        }
    }
    // 소수점 넷째자리까지만 입력가능
    const _pattern2 = /^\d*[.]\d{4}$/;
    if (_pattern2.test(_value)) {
        return false;
    }
}