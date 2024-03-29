// * 성능개선사업평가 서비스 자바스크립트 관리자페이지*


// 성능개선사업평가 아웃풋 계산값 셋팅 저장함수

// 가중치
function weightSettingSave(){

    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        const formData = new FormData(document.getElementById('weightForm'));

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/weightSettingSave"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'POST',
            data : formData,
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
                    // console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {
                    // console.log("적용완료");
                    alertSuccess("적용 완료했습니다.");
                    weightSettingData();
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

// 가중치 데이터 호출
function weightSettingData(){
    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/weightSettingData"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
            },
            error: function (request) {
                if (request.status === 500) {
                    // console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {

                    // console.log(request.sendData.weight);

                    $("#piOldSafetyStan").val(request.sendData.weight.piOldSafetyStan);
                    $("#piOldSafetyMin").val(request.sendData.weight.piOldSafetyMin);
                    $("#piOldSafetyMax").val(request.sendData.weight.piOldSafetyMax);
                    $("#piOldOldStan").val(request.sendData.weight.piOldOldStan);
                    $("#piOldOldMin").val(request.sendData.weight.piOldOldMin);
                    $("#piOldOldMax").val(request.sendData.weight.piOldOldMax);
                    $("#piOldUrgencyStan").val(request.sendData.weight.piOldUrgencyStan);
                    $("#piOldUrgencyMin").val(request.sendData.weight.piOldUrgencyMin);
                    $("#piOldUrgencyMax").val(request.sendData.weight.piOldUrgencyMax);
                    $("#piOldGoalStan").val(request.sendData.weight.piOldGoalStan);
                    $("#piOldGoalMin").val(request.sendData.weight.piOldGoalMin);
                    $("#piOldGoalMax").val(request.sendData.weight.piOldGoalMax);

                    $("#piOldSafeUtilityStan").val(request.sendData.weight.piOldSafeUtilityStan);
                    $("#piOldSafeUtilityMin").val(request.sendData.weight.piOldSafeUtilityMin);
                    $("#piOldSafeUtilityMax").val(request.sendData.weight.piOldSafeUtilityMax);
                    $("#piOldCostUtilityStan").val(request.sendData.weight.piOldCostUtilityStan);
                    $("#piOldCostUtilityMin").val(request.sendData.weight.piOldCostUtilityMin);
                    $("#piOldCostUtilityMax").val(request.sendData.weight.piOldCostUtilityMax);

                    $("#piOldBusinessStan").val(request.sendData.weight.piOldBusinessStan);
                    $("#piOldBusinessMin").val(request.sendData.weight.piOldBusinessMin);
                    $("#piOldBusinessMax").val(request.sendData.weight.piOldBusinessMax);
                    $("#piOldComplaintStan").val(request.sendData.weight.piOldComplaintStan);
                    $("#piOldComplaintMin").val(request.sendData.weight.piOldComplaintMin);
                    $("#piOldComplaintMax").val(request.sendData.weight.piOldComplaintMax);
                    $("#piOldBusinessEffectStan").val(request.sendData.weight.piOldBusinessEffectStan);
                    $("#piOldBusinessEffectMin").val(request.sendData.weight.piOldBusinessEffectMin);
                    $("#piOldBusinessEffectMax").val(request.sendData.weight.piOldBusinessEffectMax);


                    $("#piUseSafetyStan").val(request.sendData.weight.piUseSafetyStan);
                    $("#piUseSafetyMin").val(request.sendData.weight.piUseSafetyMin);
                    $("#piUseSafetyMax").val(request.sendData.weight.piUseSafetyMax);
                    $("#piUseUsabilityStan").val(request.sendData.weight.piUseUsabilityStan);
                    $("#piUseUsabilityMin").val(request.sendData.weight.piUseUsabilityMin);
                    $("#piUseUsabilityMax").val(request.sendData.weight.piUseUsabilityMax);
                    $("#piUseOldStan").val(request.sendData.weight.piUseOldStan);
                    $("#piUseOldMin").val(request.sendData.weight.piUseOldMin);
                    $("#piUseOldMax").val(request.sendData.weight.piUseOldMax);

                    $("#piUseBusinessScaleRankStan").val(request.sendData.weight.piUseBusinessScaleRankStan);
                    $("#piUseBusinessScaleRankMin").val(request.sendData.weight.piUseBusinessScaleRankMin);
                    $("#piUseBusinessScaleRankMax").val(request.sendData.weight.piUseBusinessScaleRankMax);
                    $("#piUseBusinessEffectRankStan").val(request.sendData.weight.piUseBusinessEffectRankStan);
                    $("#piUseBusinessEffectRankMin").val(request.sendData.weight.piUseBusinessEffectRankMin);
                    $("#piUseBusinessEffectRankMax").val(request.sendData.weight.piUseBusinessEffectRankMax);

                    $("#piUseBusinessStan").val(request.sendData.weight.piUseBusinessStan);
                    $("#piUseBusinessMin").val(request.sendData.weight.piUseBusinessMin);
                    $("#piUseBusinessMax").val(request.sendData.weight.piUseBusinessMax);
                    $("#piUseComplaintStan").val(request.sendData.weight.piUseComplaintStan);
                    $("#piUseComplaintMin").val(request.sendData.weight.piUseComplaintMin);
                    $("#piUseComplaintMax").val(request.sendData.weight.piUseComplaintMax);
                    $("#piUseBusinessEffectStan").val(request.sendData.weight.piUseBusinessEffectStan);
                    $("#piUseBusinessEffectMin").val(request.sendData.weight.piUseBusinessEffectMin);
                    $("#piUseBusinessEffectMax").val(request.sendData.weight.piUseBusinessEffectMax);


                    $("#piBaseSafetyStan").val(request.sendData.weight.piBaseSafetyStan);
                    $("#piBaseSafetyMin").val(request.sendData.weight.piBaseSafetyMin);
                    $("#piBaseSafetyMax").val(request.sendData.weight.piBaseSafetyMax);
                    $("#piBaseOldStan").val(request.sendData.weight.piBaseOldStan);
                    $("#piBaseOldMin").val(request.sendData.weight.piBaseOldMin);
                    $("#piBaseOldMax").val(request.sendData.weight.piBaseOldMax);

                    $("#piBaseBusinessScaleRankStan").val(request.sendData.weight.piBaseBusinessScaleRankStan);
                    $("#piBaseBusinessScaleRankMin").val(request.sendData.weight.piBaseBusinessScaleRankMin);
                    $("#piBaseBusinessScaleRankMax").val(request.sendData.weight.piBaseBusinessScaleRankMax);
                    $("#piBaseBusinessEffectRankStan").val(request.sendData.weight.piBaseBusinessEffectRankStan);
                    $("#piBaseBusinessEffectRankMin").val(request.sendData.weight.piBaseBusinessEffectRankMin);
                    $("#piBaseBusinessEffectRankMax").val(request.sendData.weight.piBaseBusinessEffectRankMax);

                    $("#piBaseBusinessStan").val(request.sendData.weight.piBaseBusinessStan);
                    $("#piBaseBusinessMin").val(request.sendData.weight.piBaseBusinessMin);
                    $("#piBaseBusinessMax").val(request.sendData.weight.piBaseBusinessMax);
                    $("#piBaseBusinessEffectStan").val(request.sendData.weight.piBaseBusinessEffectStan);
                    $("#piBaseBusinessEffectMin").val(request.sendData.weight.piBaseBusinessEffectMin);
                    $("#piBaseBusinessEffectMax").val(request.sendData.weight.piBaseBusinessEffectMax);


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

// 기술성
function techSettingSave(){

    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        const $piTechSafetyAe = $("#piTechSafetyAe");
        const $piTechSafetyBd = $("#piTechSafetyBd");
        const $piTechSafetyCc = $("#piTechSafetyCc");
        const $piTechSafetyDb = $("#piTechSafetyDb");
        const $piTechSafetyEa = $("#piTechSafetyEa");
        if($piTechSafetyAe.val()===""){
            $piTechSafetyAe.val("100")
        }
        if($piTechSafetyBd.val()===""){
            $piTechSafetyBd.val("80")
        }
        if($piTechSafetyCc.val()===""){
            $piTechSafetyCc.val("60")
        }
        if($piTechSafetyDb.val()===""){
            $piTechSafetyDb.val("20")
        }
        if($piTechSafetyEa.val()===""){
            $piTechSafetyEa.val("0")
        }

        const $piTechOldAMin = $("#piTechOldAMin");
        const $piTechOldAScore = $("#piTechOldAScore");
        const $piTechOldBMin = $("#piTechOldBMin");
        const $piTechOldBMax = $("#piTechOldBMax");
        const $piTechOldBScore = $("#piTechOldBScore");
        const $piTechOldCMin = $("#piTechOldCMin");
        const $piTechOldCMax = $("#piTechOldCMax");
        const $piTechOldCScore = $("#piTechOldCScore");
        const $piTechOldDMin = $("#piTechOldDMin");
        const $piTechOldDMax = $("#piTechOldDMax");
        const $piTechOldDScore = $("#piTechOldDScore");
        const $piTechOldEMax = $("#piTechOldEMax");
        const $piTechOldEScore = $("#piTechOldEScore");

        if($piTechOldAMin.val()===""){
            $piTechOldAMin.val("50")
        }
        if($piTechOldAScore.val()===""){
            $piTechOldAScore.val("100")
        }
        if($piTechOldBMin.val()===""){
            $piTechOldBMin.val("30")
        }
        if($piTechOldBMax.val()===""){
            $piTechOldBMax.val("49")
        }
        if($piTechOldBScore.val()===""){
            $piTechOldBScore.val("90")
        }
        if($piTechOldCMin.val()===""){
            $piTechOldCMin.val("20")
        }
        if($piTechOldCMax.val()===""){
            $piTechOldCMax.val("29")
        }
        if($piTechOldCScore.val()===""){
            $piTechOldCScore.val("80")
        }
        if($piTechOldDMin.val()===""){
            $piTechOldDMin.val("10")
        }
        if($piTechOldDMax.val()===""){
            $piTechOldDMax.val("19")
        }
        if($piTechOldDScore.val()===""){
            $piTechOldDScore.val("50")
        }
        if($piTechOldEMax.val()===""){
            $piTechOldEMax.val("9")
        }
        if($piTechOldEScore.val()===""){
            $piTechOldEScore.val("0")
        }

        const $piTechUsabilityAe = $("#piTechUsabilityAe");
        const $piTechUsabilityBd = $("#piTechUsabilityBd");
        const $piTechUsabilityCc = $("#piTechUsabilityCc");
        const $piTechUsabilityDb = $("#piTechUsabilityDb");
        const $piTechUsabilityEa = $("#piTechUsabilityEa");
        if($piTechUsabilityAe.val()===""){
            $piTechUsabilityAe.val("100")
        }
        if($piTechUsabilityBd.val()===""){
            $piTechUsabilityBd.val("80")
        }
        if($piTechUsabilityCc.val()===""){
            $piTechUsabilityCc.val("60")
        }
        if($piTechUsabilityDb.val()===""){
            $piTechUsabilityDb.val("20")
        }
        if($piTechUsabilityEa.val()===""){
            $piTechUsabilityEa.val("0")
        }

        const $piTechRetardationA0 = $("#piTechRetardationA0");
        const $piTechRetardationA1 = $("#piTechRetardationA1");
        const $piTechRetardationA2 = $("#piTechRetardationA2");
        const $piTechRetardationA3 = $("#piTechRetardationA3");
        const $piTechRetardationA4 = $("#piTechRetardationA4");
        const $piTechRetardationB0 = $("#piTechRetardationB0");
        const $piTechRetardationB1 = $("#piTechRetardationB1");
        const $piTechRetardationB2 = $("#piTechRetardationB2");
        const $piTechRetardationB3 = $("#piTechRetardationB3");
        const $piTechRetardationB4 = $("#piTechRetardationB4");
        const $piTechRetardationC0 = $("#piTechRetardationC0");
        const $piTechRetardationC1 = $("#piTechRetardationC1");
        const $piTechRetardationC2 = $("#piTechRetardationC2");
        const $piTechRetardationC3 = $("#piTechRetardationC3");
        const $piTechRetardationC4 = $("#piTechRetardationC4");
        const $piTechRetardationD0 = $("#piTechRetardationD0");
        const $piTechRetardationD1 = $("#piTechRetardationD1");
        const $piTechRetardationD2 = $("#piTechRetardationD2");
        const $piTechRetardationD3 = $("#piTechRetardationD3");
        const $piTechRetardationD4 = $("#piTechRetardationD4");
        const $piTechRetardationE0 = $("#piTechRetardationE0");
        const $piTechRetardationE1 = $("#piTechRetardationE1");
        const $piTechRetardationE2 = $("#piTechRetardationE2");
        const $piTechRetardationE3 = $("#piTechRetardationE3");
        const $piTechRetardationE4 = $("#piTechRetardationE4");
        if($piTechRetardationA0.val()===""){
            $piTechRetardationA0.val("0")
        }
        if($piTechRetardationA1.val()===""){
            $piTechRetardationA1.val("0")
        }
        if($piTechRetardationA2.val()===""){
            $piTechRetardationA2.val("0")
        }
        if($piTechRetardationA3.val()===""){
            $piTechRetardationA3.val("10")
        }
        if($piTechRetardationA4.val()===""){
            $piTechRetardationA4.val("20")
        }
        if($piTechRetardationB0.val()===""){
            $piTechRetardationB0.val("0")
        }
        if($piTechRetardationB1.val()===""){
            $piTechRetardationB1.val("10")
        }
        if($piTechRetardationB2.val()===""){
            $piTechRetardationB2.val("20")
        }
        if($piTechRetardationB3.val()===""){
            $piTechRetardationB3.val("30")
        }
        if($piTechRetardationB4.val()===""){
            $piTechRetardationB4.val("40")
        }
        if($piTechRetardationC0.val()===""){
            $piTechRetardationC0.val("30")
        }
        if($piTechRetardationC1.val()===""){
            $piTechRetardationC1.val("50")
        }
        if($piTechRetardationC2.val()===""){
            $piTechRetardationC2.val("60")
        }
        if($piTechRetardationC3.val()===""){
            $piTechRetardationC3.val("70")
        }
        if($piTechRetardationC4.val()===""){
            $piTechRetardationC4.val("80")
        }
        if($piTechRetardationD0.val()===""){
            $piTechRetardationD0.val("80")
        }
        if($piTechRetardationD1.val()===""){
            $piTechRetardationD1.val("90")
        }
        if($piTechRetardationD2.val()===""){
            $piTechRetardationD2.val("100")
        }
        if($piTechRetardationD3.val()===""){
            $piTechRetardationD3.val("100")
        }
        if($piTechRetardationD4.val()===""){
            $piTechRetardationD4.val("100")
        }
        if($piTechRetardationE0.val()===""){
            $piTechRetardationE0.val("100")
        }
        if($piTechRetardationE1.val()===""){
            $piTechRetardationE1.val("100")
        }
        if($piTechRetardationE2.val()===""){
            $piTechRetardationE2.val("100")
        }
        if($piTechRetardationE3.val()===""){
            $piTechRetardationE3.val("100")
        }
        if($piTechRetardationE4.val()===""){
            $piTechRetardationE4.val("100")
        }


        const $piTechPerformanceAa = $("#piTechPerformanceAa");
        const $piTechPerformanceAb = $("#piTechPerformanceAb");
        const $piTechPerformanceAc = $("#piTechPerformanceAc");
        const $piTechPerformanceBa = $("#piTechPerformanceBa");
        const $piTechPerformanceBb = $("#piTechPerformanceBb");
        const $piTechPerformanceBc = $("#piTechPerformanceBc");
        const $piTechPerformanceCa = $("#piTechPerformanceCa");
        const $piTechPerformanceCb = $("#piTechPerformanceCb");
        const $piTechPerformanceCc = $("#piTechPerformanceCc");
        const $piTechPerformanceDa = $("#piTechPerformanceDa");
        const $piTechPerformanceDb = $("#piTechPerformanceDb");
        const $piTechPerformanceDc = $("#piTechPerformanceDc");
        const $piTechPerformanceEa = $("#piTechPerformanceEa");
        const $piTechPerformanceEb = $("#piTechPerformanceEb");
        const $piTechPerformanceEc = $("#piTechPerformanceEc");
        if($piTechPerformanceAa.val()===""){
            $piTechPerformanceAa.val("100")
        }
        if($piTechPerformanceAb.val()===""){
            $piTechPerformanceAb.val("100")
        }
        if($piTechPerformanceAc.val()===""){
            $piTechPerformanceAc.val("100")
        }
        if($piTechPerformanceBa.val()===""){
            $piTechPerformanceBa.val("30")
        }
        if($piTechPerformanceBb.val()===""){
            $piTechPerformanceBb.val("70")
        }
        if($piTechPerformanceBc.val()===""){
            $piTechPerformanceBc.val("80")
        }
        if($piTechPerformanceCa.val()===""){
            $piTechPerformanceCa.val("0")
        }
        if($piTechPerformanceCb.val()===""){
            $piTechPerformanceCb.val("20")
        }
        if($piTechPerformanceCc.val()===""){
            $piTechPerformanceCc.val("70")
        }
        if($piTechPerformanceDa.val()===""){
            $piTechPerformanceDa.val("0")
        }
        if($piTechPerformanceDb.val()===""){
            $piTechPerformanceDb.val("0")
        }
        if($piTechPerformanceDc.val()===""){
            $piTechPerformanceDc.val("0")
        }
        if($piTechPerformanceEa.val()===""){
            $piTechPerformanceEa.val("0")
        }
        if($piTechPerformanceEb.val()===""){
            $piTechPerformanceEb.val("0")
        }
        if($piTechPerformanceEc.val()===""){
            $piTechPerformanceEc.val("0")
        }


        const $piTechGoalAPlusMin = $("#piTechGoalAPlusMin");
        const $piTechGoalAPlusMax = $("#piTechGoalAPlusMax");
        const $piTechGoalAMinusMin = $("#piTechGoalAMinusMin");
        const $piTechGoalAMinusMax = $("#piTechGoalAMinusMax");
        const $piTechGoalBPlusMin = $("#piTechGoalBPlusMin");
        const $piTechGoalBPlusMax = $("#piTechGoalBPlusMax");
        const $piTechGoalBMinusMin = $("#piTechGoalBMinusMin");
        const $piTechGoalBMinusMax = $("#piTechGoalBMinusMax");
        const $piTechGoalCPlusMin = $("#piTechGoalCPlusMin");
        const $piTechGoalCPlusMax = $("#piTechGoalCPlusMax");
        const $piTechGoalCMinusMin = $("#piTechGoalCMinusMin");
        const $piTechGoalCMinusMax = $("#piTechGoalCMinusMax");
        const $piTechGoalDPlusMin = $("#piTechGoalDPlusMin");
        const $piTechGoalDPlusMax = $("#piTechGoalDPlusMax");
        const $piTechGoalDMinusMin = $("#piTechGoalDMinusMin");
        const $piTechGoalDMinusMax = $("#piTechGoalDMinusMax");
        const $piTechGoalEMax = $("#piTechGoalEMax");

        if($piTechGoalAPlusMin.val()===""){
            $piTechGoalAPlusMin.val("90")
        }
        if($piTechGoalAPlusMax.val()===""){
            $piTechGoalAPlusMax.val("100")
        }
        if($piTechGoalAMinusMin.val()===""){
            $piTechGoalAMinusMin.val("80")
        }
        if($piTechGoalAMinusMax.val()===""){
            $piTechGoalAMinusMax.val("89")
        }
        if($piTechGoalBPlusMin.val()===""){
            $piTechGoalBPlusMin.val("70")
        }
        if($piTechGoalBPlusMax.val()===""){
            $piTechGoalBPlusMax.val("79")
        }
        if($piTechGoalBMinusMin.val()===""){
            $piTechGoalBMinusMin.val("60")
        }
        if($piTechGoalBMinusMax.val()===""){
            $piTechGoalBMinusMax.val("69")
        }
        if($piTechGoalCPlusMin.val()===""){
            $piTechGoalCPlusMin.val("55")
        }
        if($piTechGoalCPlusMax.val()===""){
            $piTechGoalCPlusMax.val("59")
        }
        if($piTechGoalCMinusMin.val()===""){
            $piTechGoalCMinusMin.val("50")
        }
        if($piTechGoalCMinusMax.val()===""){
            $piTechGoalCMinusMax.val("54")
        }
        if($piTechGoalDPlusMin.val()===""){
            $piTechGoalDPlusMin.val("45")
        }
        if($piTechGoalDPlusMax.val()===""){
            $piTechGoalDPlusMax.val("49")
        }
        if($piTechGoalDMinusMin.val()===""){
            $piTechGoalDMinusMin.val("40")
        }
        if($piTechGoalDMinusMax.val()===""){
            $piTechGoalDMinusMax.val("44")
        }
        if($piTechGoalEMax.val()===""){
            $piTechGoalEMax.val("39")
        }

        const formData = new FormData(document.getElementById('techForm'));

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/techSave"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'POST',
            data : formData,
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
                    // console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {
                    // console.log("적용완료");
                    alertSuccess("적용 완료했습니다.");
                    techSettingData();
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

// 기술성 데이터 호출
function techSettingData(){
    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/techData"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
            },
            error: function (request) {
                if (request.status === 500) {
                    // console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {

                    $("#piTechSafetyAe").val(request.sendData.technicality.piTechSafetyAe);
                    $("#piTechSafetyBd").val(request.sendData.technicality.piTechSafetyBd);
                    $("#piTechSafetyCc").val(request.sendData.technicality.piTechSafetyCc);
                    $("#piTechSafetyDb").val(request.sendData.technicality.piTechSafetyDb);
                    $("#piTechSafetyEa").val(request.sendData.technicality.piTechSafetyEa);

                    $("#piTechOldAMin").val(request.sendData.technicality.piTechOldAMin);
                    $("#piTechOldAScore").val(request.sendData.technicality.piTechOldAScore);
                    $("#piTechOldBMin").val(request.sendData.technicality.piTechOldBMin);
                    $("#piTechOldBMax").val(request.sendData.technicality.piTechOldBMax);
                    $("#piTechOldBScore").val(request.sendData.technicality.piTechOldBScore);
                    $("#piTechOldCMin").val(request.sendData.technicality.piTechOldCMin);
                    $("#piTechOldCMax").val(request.sendData.technicality.piTechOldCMax);
                    $("#piTechOldCScore").val(request.sendData.technicality.piTechOldCScore);
                    $("#piTechOldDMin").val(request.sendData.technicality.piTechOldDMin);
                    $("#piTechOldDMax").val(request.sendData.technicality.piTechOldDMin);
                    $("#piTechOldDScore").val(request.sendData.technicality.piTechOldDScore);
                    $("#piTechOldEMax").val(request.sendData.technicality.piTechOldEMax);
                    $("#piTechOldEScore").val(request.sendData.technicality.piTechOldEScore);

                    $("#piTechUsabilityAe").val(request.sendData.technicality.piTechUsabilityAe);
                    $("#piTechUsabilityBd").val(request.sendData.technicality.piTechUsabilityBd);
                    $("#piTechUsabilityCc").val(request.sendData.technicality.piTechUsabilityCc);
                    $("#piTechUsabilityDb").val(request.sendData.technicality.piTechUsabilityDb);
                    $("#piTechUsabilityEa").val(request.sendData.technicality.piTechUsabilityEa);

                    $("#piTechRetardationA0").val(request.sendData.technicality.piTechRetardationA0);
                    $("#piTechRetardationA1").val(request.sendData.technicality.piTechRetardationA1);
                    $("#piTechRetardationA2").val(request.sendData.technicality.piTechRetardationA2);
                    $("#piTechRetardationA3").val(request.sendData.technicality.piTechRetardationA3);
                    $("#piTechRetardationA4").val(request.sendData.technicality.piTechRetardationA4);
                    $("#piTechRetardationB0").val(request.sendData.technicality.piTechRetardationB0);
                    $("#piTechRetardationB1").val(request.sendData.technicality.piTechRetardationB1);
                    $("#piTechRetardationB2").val(request.sendData.technicality.piTechRetardationB2);
                    $("#piTechRetardationB3").val(request.sendData.technicality.piTechRetardationB3);
                    $("#piTechRetardationB4").val(request.sendData.technicality.piTechRetardationB4);
                    $("#piTechRetardationC0").val(request.sendData.technicality.piTechRetardationC0);
                    $("#piTechRetardationC1").val(request.sendData.technicality.piTechRetardationC1);
                    $("#piTechRetardationC2").val(request.sendData.technicality.piTechRetardationC2);
                    $("#piTechRetardationC3").val(request.sendData.technicality.piTechRetardationC3);
                    $("#piTechRetardationC4").val(request.sendData.technicality.piTechRetardationC4);
                    $("#piTechRetardationD0").val(request.sendData.technicality.piTechRetardationD0);
                    $("#piTechRetardationD1").val(request.sendData.technicality.piTechRetardationD1);
                    $("#piTechRetardationD2").val(request.sendData.technicality.piTechRetardationD2);
                    $("#piTechRetardationD3").val(request.sendData.technicality.piTechRetardationD3);
                    $("#piTechRetardationD4").val(request.sendData.technicality.piTechRetardationD4);
                    $("#piTechRetardationE0").val(request.sendData.technicality.piTechRetardationE0);
                    $("#piTechRetardationE1").val(request.sendData.technicality.piTechRetardationE1);
                    $("#piTechRetardationE2").val(request.sendData.technicality.piTechRetardationE2);
                    $("#piTechRetardationE3").val(request.sendData.technicality.piTechRetardationE3);
                    $("#piTechRetardationE4").val(request.sendData.technicality.piTechRetardationE4);

                    $("#piTechPerformanceAa").val(request.sendData.technicality.piTechPerformanceAa);
                    $("#piTechPerformanceAb").val(request.sendData.technicality.piTechPerformanceAb);
                    $("#piTechPerformanceAc").val(request.sendData.technicality.piTechPerformanceAc);
                    $("#piTechPerformanceBa").val(request.sendData.technicality.piTechPerformanceBa);
                    $("#piTechPerformanceBb").val(request.sendData.technicality.piTechPerformanceBb);
                    $("#piTechPerformanceBc").val(request.sendData.technicality.piTechPerformanceBc);
                    $("#piTechPerformanceCa").val(request.sendData.technicality.piTechPerformanceCa);
                    $("#piTechPerformanceCb").val(request.sendData.technicality.piTechPerformanceCb);
                    $("#piTechPerformanceCc").val(request.sendData.technicality.piTechPerformanceCc);
                    $("#piTechPerformanceDa").val(request.sendData.technicality.piTechPerformanceDa);
                    $("#piTechPerformanceDb").val(request.sendData.technicality.piTechPerformanceDb);
                    $("#piTechPerformanceDc").val(request.sendData.technicality.piTechPerformanceDc);
                    $("#piTechPerformanceEa").val(request.sendData.technicality.piTechPerformanceEa);
                    $("#piTechPerformanceEb").val(request.sendData.technicality.piTechPerformanceEb);
                    $("#piTechPerformanceEc").val(request.sendData.technicality.piTechPerformanceEc);

                    $("#piTechGoalAPlusMin").val(request.sendData.technicality.piTechGoalAPlusMin);
                    $("#piTechGoalAPlusMax").val(request.sendData.technicality.piTechGoalAPlusMax);
                    $("#piTechGoalAMinusMin").val(request.sendData.technicality.piTechGoalAMinusMin);
                    $("#piTechGoalAMinusMax").val(request.sendData.technicality.piTechGoalAMinusMax);
                    $("#piTechGoalBPlusMin").val(request.sendData.technicality.piTechGoalBPlusMin);
                    $("#piTechGoalBPlusMax").val(request.sendData.technicality.piTechGoalBPlusMax);
                    $("#piTechGoalBMinusMin").val(request.sendData.technicality.piTechGoalBMinusMin);
                    $("#piTechGoalBMinusMax").val(request.sendData.technicality.piTechGoalBMinusMax);
                    $("#piTechGoalCPlusMin").val(request.sendData.technicality.piTechGoalCPlusMin);
                    $("#piTechGoalCPlusMax").val(request.sendData.technicality.piTechGoalCPlusMax);
                    $("#piTechGoalCMinusMin").val(request.sendData.technicality.piTechGoalCMinusMin);
                    $("#piTechGoalCMinusMax").val(request.sendData.technicality.piTechGoalCMinusMax);
                    $("#piTechGoalDPlusMin").val(request.sendData.technicality.piTechGoalDPlusMin);
                    $("#piTechGoalDPlusMax").val(request.sendData.technicality.piTechGoalDPlusMax);
                    $("#piTechGoalDMinusMin").val(request.sendData.technicality.piTechGoalDMinusMin);
                    $("#piTechGoalDMinusMax").val(request.sendData.technicality.piTechGoalDMinusMax);
                    $("#piTechGoalEMax").val(request.sendData.technicality.piTechGoalEMax);

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

// 경제성
function ecoSettingSave(){


    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        const $piEcoAssetAMin = $("#piEcoAssetAMin");
        const $piEcoAssetAScore = $("#piEcoAssetAScore");
        const $piEcoAssetBMin = $("#piEcoAssetBMin");
        const $piEcoAssetBMax = $("#piEcoAssetBMax");
        const $piEcoAssetBScore = $("#piEcoAssetBScore");
        const $piEcoAssetCMin = $("#piEcoAssetCMin");
        const $piEcoAssetCMax = $("#piEcoAssetCMax");
        const $piEcoAssetCScore = $("#piEcoAssetCScore");
        const $piEcoAssetDMin = $("#piEcoAssetDMin");
        const $piEcoAssetDMax = $("#piEcoAssetDMax");
        const $piEcoAssetDScore = $("#piEcoAssetDScore");
        const $piEcoAssetEMax = $("#piEcoAssetEMax");
        const $piEcoAssetEScore = $("#piEcoAssetEScore");
        if($piEcoAssetAMin.val()===""){
            $piEcoAssetAMin.val("5")
        }
        if($piEcoAssetAScore.val()===""){
            $piEcoAssetAScore.val("100")
        }
        if($piEcoAssetBMin.val()===""){
            $piEcoAssetBMin.val("4")
        }
        if($piEcoAssetBMax.val()===""){
            $piEcoAssetBMax.val("5")
        }
        if($piEcoAssetBScore.val()===""){
            $piEcoAssetBScore.val("80")
        }
        if($piEcoAssetCMin.val()===""){
            $piEcoAssetCMin.val("3")
        }
        if($piEcoAssetCMax.val()===""){
            $piEcoAssetCMax.val("4")
        }
        if($piEcoAssetCScore.val()===""){
            $piEcoAssetCScore.val("70")
        }
        if($piEcoAssetDMin.val()===""){
            $piEcoAssetDMin.val("1")
        }
        if($piEcoAssetDMax.val()===""){
            $piEcoAssetDMax.val("3")
        }
        if($piEcoAssetDScore.val()===""){
            $piEcoAssetDScore.val("50")
        }
        if($piEcoAssetEMax.val()===""){
            $piEcoAssetEMax.val("1")
        }
        if($piEcoAssetEScore.val()===""){
            $piEcoAssetEScore.val("30")
        }

        const $piEcoLifeA = $("#piEcoLifeA");
        const $piEcoLifeB = $("#piEcoLifeB");
        const $piEcoLifeC = $("#piEcoLifeC");
        const $piEcoLifeD = $("#piEcoLifeD");
        const $piEcoLifeE = $("#piEcoLifeE");
        if($piEcoLifeA.val()===""){
            $piEcoLifeA.val("95")
        }
        if($piEcoLifeB.val()===""){
            $piEcoLifeB.val("75")
        }
        if($piEcoLifeC.val()===""){
            $piEcoLifeC.val("50")
        }
        if($piEcoLifeD.val()===""){
            $piEcoLifeD.val("30")
        }
        if($piEcoLifeE.val()===""){
            $piEcoLifeE.val("5")
        }

        const $piEcoFacilityA = $("#piEcoFacilityA");
        const $piEcoFacilityB = $("#piEcoFacilityB");
        const $piEcoFacilityC = $("#piEcoFacilityC");
        const $piEcoFacilityD = $("#piEcoFacilityD");
        const $piEcoFacilityE = $("#piEcoFacilityE");
        const $piEcoFacilityF = $("#piEcoFacilityF");
        const $piEcoFacilityG = $("#piEcoFacilityG");
        if($piEcoFacilityA.val()===""){
            $piEcoFacilityA.val("20")
        }
        if($piEcoFacilityB.val()===""){
            $piEcoFacilityB.val("20")
        }
        if($piEcoFacilityC.val()===""){
            $piEcoFacilityC.val("20")
        }
        if($piEcoFacilityD.val()===""){
            $piEcoFacilityD.val("20")
        }
        if($piEcoFacilityE.val()===""){
            $piEcoFacilityE.val("20")
        }
        if($piEcoFacilityF.val()===""){
            $piEcoFacilityF.val("20")
        }
        if($piEcoFacilityG.val()===""){
            $piEcoFacilityG.val("20")
        }


        const $piEcoUtilityAa = $("#piEcoUtilityAa");
        const $piEcoUtilityBa = $("#piEcoUtilityBa");
        const $piEcoUtilityBb = $("#piEcoUtilityBb");
        const $piEcoUtilityCa = $("#piEcoUtilityCa");
        const $piEcoUtilityCb = $("#piEcoUtilityCb");
        const $piEcoUtilityCc = $("#piEcoUtilityCc");
        const $piEcoUtilityDa = $("#piEcoUtilityDa");
        const $piEcoUtilityDb = $("#piEcoUtilityDb");
        const $piEcoUtilityDc = $("#piEcoUtilityDc");
        const $piEcoUtilityDd = $("#piEcoUtilityDd");
        const $piEcoUtilityEa = $("#piEcoUtilityEa");
        const $piEcoUtilityEb = $("#piEcoUtilityEb");
        const $piEcoUtilityEc = $("#piEcoUtilityEc");
        const $piEcoUtilityEd = $("#piEcoUtilityEd");
        const $piEcoUtilityEe = $("#piEcoUtilityEe");
        if($piEcoUtilityAa.val()===""){
            $piEcoUtilityAa.val("5")
        }
        if($piEcoUtilityBa.val()===""){
            $piEcoUtilityBa.val("20")
        }
        if($piEcoUtilityBb.val()===""){
            $piEcoUtilityBb.val("10")
        }
        if($piEcoUtilityCa.val()===""){
            $piEcoUtilityCa.val("80")
        }
        if($piEcoUtilityCb.val()===""){
            $piEcoUtilityCb.val("50")
        }
        if($piEcoUtilityCc.val()===""){
            $piEcoUtilityCc.val("0")
        }
        if($piEcoUtilityDa.val()===""){
            $piEcoUtilityDa.val("90")
        }
        if($piEcoUtilityDb.val()===""){
            $piEcoUtilityDb.val("70")
        }
        if($piEcoUtilityDc.val()===""){
            $piEcoUtilityDc.val("30")
        }
        if($piEcoUtilityDd.val()===""){
            $piEcoUtilityDd.val("0")
        }
        if($piEcoUtilityEa.val()===""){
            $piEcoUtilityEa.val("100")
        }
        if($piEcoUtilityEb.val()===""){
            $piEcoUtilityEb.val("80")
        }
        if($piEcoUtilityEc.val()===""){
            $piEcoUtilityEc.val("50")
        }
        if($piEcoUtilityEd.val()===""){
            $piEcoUtilityEd.val("10")
        }
        if($piEcoUtilityEe.val()===""){
            $piEcoUtilityEe.val("0")
        }


        const $piEcoTrafficAMin = $("#piEcoTrafficAMin");
        const $piEcoTrafficAScore = $("#piEcoTrafficAScore");
        const $piEcoTrafficBMin = $("#piEcoTrafficBMin");
        const $piEcoTrafficBMax = $("#piEcoTrafficBMax");
        const $piEcoTrafficBScore = $("#piEcoTrafficBScore");
        const $piEcoTrafficCMin = $("#piEcoTrafficCMin");
        const $piEcoTrafficCMax = $("#piEcoTrafficCMax");
        const $piEcoTrafficCScore = $("#piEcoTrafficCScore");
        const $piEcoTrafficDMin = $("#piEcoTrafficDMin");
        const $piEcoTrafficDMax = $("#piEcoTrafficDMax");
        const $piEcoTrafficDScore = $("#piEcoTrafficDScore");
        const $piEcoTrafficEMax = $("#piEcoTrafficEMax");
        const $piEcoTrafficEScore = $("#piEcoTrafficEScore");
        if($piEcoTrafficAMin.val()===""){
            $piEcoTrafficAMin.val("20000")
        }
        if($piEcoTrafficAScore.val()===""){
            $piEcoTrafficAScore.val("5")
        }
        if($piEcoTrafficBMin.val()===""){
            $piEcoTrafficBMin.val("10000")
        }
        if($piEcoTrafficBMax.val()===""){
            $piEcoTrafficBMax.val("19999")
        }
        if($piEcoTrafficBScore.val()===""){
            $piEcoTrafficBScore.val("4")
        }
        if($piEcoTrafficCMin.val()===""){
            $piEcoTrafficCMin.val("5000")
        }
        if($piEcoTrafficCMax.val()===""){
            $piEcoTrafficCMax.val("9999")
        }
        if($piEcoTrafficCScore.val()===""){
            $piEcoTrafficCScore.val("3")
        }
        if($piEcoTrafficDMin.val()===""){
            $piEcoTrafficDMin.val("3000")
        }
        if($piEcoTrafficDMax.val()===""){
            $piEcoTrafficDMax.val("4999")
        }
        if($piEcoTrafficDScore.val()===""){
            $piEcoTrafficDScore.val("2")
        }
        if($piEcoTrafficEMax.val()===""){
            $piEcoTrafficEMax.val("2999")
        }
        if($piEcoTrafficEScore.val()===""){
            $piEcoTrafficEScore.val("1")
        }


        const $piEcoImproAMin = $("#piEcoImproAMin");
        const $piEcoImproAScore = $("#piEcoImproAScore");
        const $piEcoImproBMin = $("#piEcoImproBMin");
        const $piEcoImproBMax = $("#piEcoImproBMax");
        const piEcoImproBScore = $("#piEcoImproBScore");
        const $piEcoImproCMin = $("#piEcoImproCMin");
        const $piEcoImproCMax = $("#piEcoImproCMax");
        const $piEcoImproCScore = $("#piEcoImproCScore");
        const $piEcoImproDMin = $("#piEcoImproDMin");
        const $piEcoImproDMax = $("#piEcoImproDMax");
        const $piEcoImproDScore = $("#piEcoImproDScore");
        const $piEcoImproEMax = $("#piEcoImproEMax");
        const $piEcoImproEScore = $("#piEcoImproEScore");
        if($piEcoImproAMin.val()===""){
            $piEcoImproAMin.val("2")
        }
        if($piEcoImproAScore.val()===""){
            $piEcoImproAScore.val("100")
        }
        if($piEcoImproBMin.val()===""){
            $piEcoImproBMin.val("1.5")
        }
        if($piEcoImproBMax.val()===""){
            $piEcoImproBMax.val("2")
        }
        if(piEcoImproBScore.val()===""){
            piEcoImproBScore.val("80")
        }
        if($piEcoImproCMin.val()===""){
            $piEcoImproCMin.val("1")
        }
        if($piEcoImproCMax.val()===""){
            $piEcoImproCMax.val("1.5")
        }
        if($piEcoImproCScore.val()===""){
            $piEcoImproCScore.val("70")
        }
        if($piEcoImproDMin.val()===""){
            $piEcoImproDMin.val("0.5")
        }
        if($piEcoImproDMax.val()===""){
            $piEcoImproDMax.val("1")
        }
        if($piEcoImproDScore.val()===""){
            $piEcoImproDScore.val("50")
        }
        if($piEcoImproEMax.val()===""){
            $piEcoImproEMax.val("0.5")
        }
        if($piEcoImproEScore.val()===""){
            $piEcoImproEScore.val("30")
        }

        const $piEcoScaleBaseA = $("#piEcoScaleBaseA");
        const $piEcoScaleBaseB = $("#piEcoScaleBaseB");
        const $piEcoScaleBaseC = $("#piEcoScaleBaseC");
        const $piEcoScaleBaseD = $("#piEcoScaleBaseD");
        const $piEcoScaleBaseE = $("#piEcoScaleBaseE");
        const $piEcoScaleScoreA = $("#piEcoScaleScoreA");
        const $piEcoScaleScoreB = $("#piEcoScaleScoreB");
        const $piEcoScaleScoreC = $("#piEcoScaleScoreC");
        const $piEcoScaleScoreD = $("#piEcoScaleScoreD");
        const $piEcoScaleScoreE = $("#piEcoScaleScoreE");
        if($piEcoScaleBaseA.val()===""){
            $piEcoScaleBaseA.val("1.5")
        }
        if($piEcoScaleBaseB.val()===""){
            $piEcoScaleBaseB.val("2")
        }
        if($piEcoScaleBaseC.val()===""){
            $piEcoScaleBaseC.val("2.5")
        }
        if($piEcoScaleBaseD.val()==="") {
            $piEcoScaleBaseD.val("3")
        }
        if($piEcoScaleBaseE.val()===""){
            $piEcoScaleBaseE.val("4")
        }
        if($piEcoScaleScoreA.val()===""){
            $piEcoScaleScoreA.val("100")
        }
        if($piEcoScaleScoreB.val()===""){
            $piEcoScaleScoreB.val("90")
        }
        if($piEcoScaleScoreC.val()===""){
            $piEcoScaleScoreC.val("80")
        }
        if($piEcoScaleScoreD.val()===""){
            $piEcoScaleScoreD.val("70")
        }
        if($piEcoScaleScoreE.val()===""){
            $piEcoScaleScoreE.val("50")
        }

        const $piEcoEfficiencyBaseA = $("#piEcoEfficiencyBaseA");
        const $piEcoEfficiencyBaseB = $("#piEcoEfficiencyBaseB");
        const $piEcoEfficiencyBaseC = $("#piEcoEfficiencyBaseC");
        const $piEcoEfficiencyBaseD = $("#piEcoEfficiencyBaseD");
        const $piEcoEfficiencyBaseE = $("#piEcoEfficiencyBaseE");
        const $piEcoEfficiencyScoreA = $("#piEcoEfficiencyScoreA");
        const $piEcoEfficiencyScoreB = $("#piEcoEfficiencyScoreB");
        const $piEcoEfficiencyScoreC = $("#piEcoEfficiencyScoreC");
        const $piEcoEfficiencyScoreD = $("#piEcoEfficiencyScoreD");
        const $piEcoEfficiencyScoreE = $("#piEcoEfficiencyScoreE");
        if($piEcoEfficiencyBaseA.val()==="") {
            $piEcoEfficiencyBaseA.val("137")
        }
        if($piEcoEfficiencyBaseC.val()===""){
            $piEcoEfficiencyBaseB.val("136")
        }
        if($piEcoEfficiencyBaseC.val()===""){
            $piEcoEfficiencyBaseC.val("341")
        }
        if($piEcoEfficiencyBaseD.val()===""){
            $piEcoEfficiencyBaseD.val("684")
        }
        if($piEcoEfficiencyBaseE.val()===""){
            $piEcoEfficiencyBaseE.val("685")
        }
        if($piEcoEfficiencyScoreA.val()===""){
            $piEcoEfficiencyScoreA.val("100")
        }
        if($piEcoEfficiencyScoreB.val()===""){
            $piEcoEfficiencyScoreB.val("90")
        }
        if($piEcoEfficiencyScoreC.val()===""){
            $piEcoEfficiencyScoreC.val("80")
        }
        if($piEcoEfficiencyScoreD.val()===""){
            $piEcoEfficiencyScoreD.val("70")
        }
        if($piEcoEfficiencyScoreE.val()===""){
            $piEcoEfficiencyScoreE.val("50")
        }

        const $piEcoGoalAPlusMin = $("#piEcoGoalAPlusMin");
        const $piEcoGoalAPlusMax = $("#piEcoGoalAPlusMax");
        const $piEcoGoalAMinusMin = $("#piEcoGoalAMinusMin");
        const $piEcoGoalAMinusMax = $("#piEcoGoalAMinusMax");
        const $piEcoGoalBPlusMin = $("#piEcoGoalBPlusMin");
        const $piEcoGoalBPlusMax = $("#piEcoGoalBPlusMax");
        const $piEcoGoalBMinusMin = $("#piEcoGoalBMinusMin");
        const $piEcoGoalBMinusMax = $("#piEcoGoalBMinusMax");
        const $piEcoGoalCPlusMin = $("#piEcoGoalCPlusMin");
        const $piEcoGoalCPlusMax = $("#piEcoGoalCPlusMax");
        const $piEcoGoalCMinusMin = $("#piEcoGoalCMinusMin");
        const $piEcoGoalCMinusMax = $("#piEcoGoalCMinusMax");
        const $piEcoGoalDPlusMin = $("#piEcoGoalDPlusMin");
        const $piEcoGoalDPlusMax = $("#piEcoGoalDPlusMax");
        const $piEcoGoalDMinusMin = $("#piEcoGoalDMinusMin");
        const $piEcoGoalDMinusMax = $("#piEcoGoalDMinusMax");
        const $piEcoGoalEMax = $("#piEcoGoalEMax");

        if($piEcoGoalAPlusMin.val()===""){
            $piEcoGoalAPlusMin.val("90")
        }
        if($piEcoGoalAPlusMax.val()===""){
            $piEcoGoalAPlusMax.val("100")
        }
        if($piEcoGoalAMinusMin.val()===""){
            $piEcoGoalAMinusMin.val("80")
        }
        if($piEcoGoalAMinusMax.val()===""){
            $piEcoGoalAMinusMax.val("89")
        }
        if($piEcoGoalBPlusMin.val()===""){
            $piEcoGoalBPlusMin.val("70")
        }
        if($piEcoGoalBPlusMax.val()===""){
            $piEcoGoalBPlusMax.val("79")
        }
        if($piEcoGoalBMinusMin.val()===""){
            $piEcoGoalBMinusMin.val("60")
        }
        if($piEcoGoalBMinusMax.val()===""){
            $piEcoGoalBMinusMax.val("69")
        }
        if($piEcoGoalCPlusMin.val()===""){
            $piEcoGoalCPlusMin.val("55")
        }
        if($piEcoGoalCPlusMax.val()===""){
            $piEcoGoalCPlusMax.val("59")
        }
        if($piEcoGoalCMinusMin.val()===""){
            $piEcoGoalCMinusMin.val("50")
        }
        if($piEcoGoalCMinusMax.val()===""){
            $piEcoGoalCMinusMax.val("54")
        }
        if($piEcoGoalDPlusMin.val()===""){
            $piEcoGoalDPlusMin.val("45")
        }
        if($piEcoGoalDPlusMax.val()===""){
            $piEcoGoalDPlusMax.val("49")
        }
        if($piEcoGoalDMinusMin.val()===""){
            $piEcoGoalDMinusMin.val("40")
        }
        if($piEcoGoalDMinusMax.val()===""){
            $piEcoGoalDMinusMax.val("44")
        }
        if($piEcoGoalEMax.val()===""){
            $piEcoGoalEMax.val("39")
        }

        const formData = new FormData(document.getElementById('ecoForm'))

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/ecoSave"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'POST',
            data : formData,
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
                    // console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {
                    // console.log("적용완료");
                    alertSuccess("적용 완료했습니다.");
                    ecoSettingData();
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

// 경제성 데이터 호출
function ecoSettingData(){
    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/ecoData"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
            },
            error: function (request) {
                if (request.status === 500) {
                    // console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {

                    $("#piEcoAssetAMin").val(request.sendData.economy.piEcoAssetAMin);
                    $("#piEcoAssetAScore").val(request.sendData.economy.piEcoAssetAScore);
                    $("#piEcoAssetBMin").val(request.sendData.economy.piEcoAssetBMin);
                    $("#piEcoAssetBMax").val(request.sendData.economy.piEcoAssetBMax);
                    $("#piEcoAssetBScore").val(request.sendData.economy.piEcoAssetBScore);
                    $("#piEcoAssetCMin").val(request.sendData.economy.piEcoAssetCMin);
                    $("#piEcoAssetCMax").val(request.sendData.economy.piEcoAssetCMax);
                    $("#piEcoAssetCScore").val(request.sendData.economy.piEcoAssetCScore);
                    $("#piEcoAssetDMin").val(request.sendData.economy.piEcoAssetDMin);
                    $("#piEcoAssetDMax").val(request.sendData.economy.piEcoAssetDMax);
                    $("#piEcoAssetDScore").val(request.sendData.economy.piEcoAssetDScore);
                    $("#piEcoAssetEMax").val(request.sendData.economy.piEcoAssetEMax);
                    $("#piEcoAssetEScore").val(request.sendData.economy.piEcoAssetEScore);

                    $("#piEcoLifeA").val(request.sendData.economy.piEcoLifeA);
                    $("#piEcoLifeB").val(request.sendData.economy.piEcoLifeB);
                    $("#piEcoLifeC").val(request.sendData.economy.piEcoLifeC);
                    $("#piEcoLifeD").val(request.sendData.economy.piEcoLifeD);
                    $("#piEcoLifeE").val(request.sendData.economy.piEcoLifeE);

                    $("#piEcoFacilityA").val(request.sendData.economy.piEcoFacilityA);
                    $("#piEcoFacilityB").val(request.sendData.economy.piEcoFacilityB);
                    $("#piEcoFacilityC").val(request.sendData.economy.piEcoFacilityC);
                    $("#piEcoFacilityD").val(request.sendData.economy.piEcoFacilityD);
                    $("#piEcoFacilityE").val(request.sendData.economy.piEcoFacilityE);
                    $("#piEcoFacilityF").val(request.sendData.economy.piEcoFacilityF);
                    $("#piEcoFacilityG").val(request.sendData.economy.piEcoFacilityG);

                    $("#piEcoUtilityAa").val(request.sendData.economy.piEcoUtilityAa);
                    $("#piEcoUtilityBa").val(request.sendData.economy.piEcoUtilityBa);
                    $("#piEcoUtilityBb").val(request.sendData.economy.piEcoUtilityBb);
                    $("#piEcoUtilityCa").val(request.sendData.economy.piEcoUtilityCa);
                    $("#piEcoUtilityCb").val(request.sendData.economy.piEcoUtilityCb);
                    $("#piEcoUtilityCc").val(request.sendData.economy.piEcoUtilityCc);
                    $("#piEcoUtilityDa").val(request.sendData.economy.piEcoUtilityDa);
                    $("#piEcoUtilityDb").val(request.sendData.economy.piEcoUtilityDb);
                    $("#piEcoUtilityDc").val(request.sendData.economy.piEcoUtilityDc);
                    $("#piEcoUtilityDd").val(request.sendData.economy.piEcoUtilityDd);
                    $("#piEcoUtilityEa").val(request.sendData.economy.piEcoUtilityEa);
                    $("#piEcoUtilityEb").val(request.sendData.economy.piEcoUtilityEb);
                    $("#piEcoUtilityEc").val(request.sendData.economy.piEcoUtilityEc);
                    $("#piEcoUtilityEd").val(request.sendData.economy.piEcoUtilityEd);
                    $("#piEcoUtilityEe").val(request.sendData.economy.piEcoUtilityEe);

                    $("#piEcoTrafficAMin").val(request.sendData.economy.piEcoTrafficAMin);
                    $("#piEcoTrafficAScore").val(request.sendData.economy.piEcoTrafficAScore);
                    $("#piEcoTrafficBMin").val(request.sendData.economy.piEcoTrafficBMin);
                    $("#piEcoTrafficBMax").val(request.sendData.economy.piEcoTrafficBMax);
                    $("#piEcoTrafficBScore").val(request.sendData.economy.piEcoTrafficBScore);
                    $("#piEcoTrafficCMin").val(request.sendData.economy.piEcoTrafficCMin);
                    $("#piEcoTrafficCMax").val(request.sendData.economy.piEcoTrafficCMax);
                    $("#piEcoTrafficCScore").val(request.sendData.economy.piEcoTrafficCScore);
                    $("#piEcoTrafficDMin").val(request.sendData.economy.piEcoTrafficDMin);
                    $("#piEcoTrafficDMax").val(request.sendData.economy.piEcoTrafficDMax);
                    $("#piEcoTrafficDScore").val(request.sendData.economy.piEcoTrafficDScore);
                    $("#piEcoTrafficEMax").val(request.sendData.economy.piEcoTrafficEMax);
                    $("#piEcoTrafficEScore").val(request.sendData.economy.piEcoTrafficEScore);

                    $("#piEcoImproAMin").val(request.sendData.economy.piEcoImproAMin);
                    $("#piEcoImproAScore").val(request.sendData.economy.piEcoImproAScore);
                    $("#piEcoImproBMin").val(request.sendData.economy.piEcoImproBMin);
                    $("#piEcoImproBMax").val(request.sendData.economy.piEcoImproBMax);
                    $("#piEcoImproBScore").val(request.sendData.economy.piEcoImproBScore);
                    $("#piEcoImproCMin").val(request.sendData.economy.piEcoImproCMin);
                    $("#piEcoImproCMax").val(request.sendData.economy.piEcoImproCMax);
                    $("#piEcoImproCScore").val(request.sendData.economy.piEcoImproCScore);
                    $("#piEcoImproDMin").val(request.sendData.economy.piEcoImproDMin);
                    $("#piEcoImproDMax").val(request.sendData.economy.piEcoImproDMax);
                    $("#piEcoImproDScore").val(request.sendData.economy.piEcoImproDScore);
                    $("#piEcoImproEMax").val(request.sendData.economy.piEcoImproEMax);
                    $("#piEcoImproEScore").val(request.sendData.economy.piEcoImproEScore);

                    $("#piEcoScaleBaseA").val(request.sendData.economy.piEcoScaleBaseA);
                    $("#piEcoScaleBaseB").val(request.sendData.economy.piEcoScaleBaseB);
                    $("#piEcoScaleBaseC").val(request.sendData.economy.piEcoScaleBaseC);
                    $("#piEcoScaleBaseD").val(request.sendData.economy.piEcoScaleBaseD);
                    $("#piEcoScaleBaseE").val(request.sendData.economy.piEcoScaleBaseE);
                    $("#piEcoScaleScoreA").val(request.sendData.economy.piEcoScaleScoreA);
                    $("#piEcoScaleScoreB").val(request.sendData.economy.piEcoScaleScoreB);
                    $("#piEcoScaleScoreC").val(request.sendData.economy.piEcoScaleScoreC);
                    $("#piEcoScaleScoreD").val(request.sendData.economy.piEcoScaleScoreD);
                    $("#piEcoScaleScoreE").val(request.sendData.economy.piEcoScaleScoreE);

                    $("#piEcoEfficiencyBaseA").val(request.sendData.economy.piEcoEfficiencyBaseA);
                    $("#piEcoEfficiencyBaseB").val(request.sendData.economy.piEcoEfficiencyBaseB);
                    $("#piEcoEfficiencyBaseC").val(request.sendData.economy.piEcoEfficiencyBaseC);
                    $("#piEcoEfficiencyBaseD").val(request.sendData.economy.piEcoEfficiencyBaseD);
                    $("#piEcoEfficiencyBaseE").val(request.sendData.economy.piEcoEfficiencyBaseE);
                    $("#piEcoEfficiencyScoreA").val(request.sendData.economy.piEcoEfficiencyScoreA);
                    $("#piEcoEfficiencyScoreB").val(request.sendData.economy.piEcoEfficiencyScoreB);
                    $("#piEcoEfficiencyScoreC").val(request.sendData.economy.piEcoEfficiencyScoreC);
                    $("#piEcoEfficiencyScoreD").val(request.sendData.economy.piEcoEfficiencyScoreD);
                    $("#piEcoEfficiencyScoreE").val(request.sendData.economy.piEcoEfficiencyScoreE);

                    $("#piEcoGoalAPlusMin").val(request.sendData.economy.piEcoGoalAPlusMin);
                    $("#piEcoGoalAPlusMax").val(request.sendData.economy.piEcoGoalAPlusMax);
                    $("#piEcoGoalAMinusMin").val(request.sendData.economy.piEcoGoalAMinusMin);
                    $("#piEcoGoalAMinusMax").val(request.sendData.economy.piEcoGoalAMinusMax);
                    $("#piEcoGoalBPlusMin").val(request.sendData.economy.piEcoGoalBPlusMin);
                    $("#piEcoGoalBPlusMax").val(request.sendData.economy.piEcoGoalBPlusMax);
                    $("#piEcoGoalBMinusMin").val(request.sendData.economy.piEcoGoalBMinusMin);
                    $("#piEcoGoalBMinusMax").val(request.sendData.economy.piEcoGoalBMinusMax);
                    $("#piEcoGoalCPlusMin").val(request.sendData.economy.piEcoGoalCPlusMin);
                    $("#piEcoGoalCPlusMax").val(request.sendData.economy.piEcoGoalCPlusMax);
                    $("#piEcoGoalCMinusMin").val(request.sendData.economy.piEcoGoalCMinusMin);
                    $("#piEcoGoalCMinusMax").val(request.sendData.economy.piEcoGoalCMinusMax);
                    $("#piEcoGoalDPlusMin").val(request.sendData.economy.piEcoGoalDPlusMin);
                    $("#piEcoGoalDPlusMax").val(request.sendData.economy.piEcoGoalDPlusMax);
                    $("#piEcoGoalDMinusMin").val(request.sendData.economy.piEcoGoalDMinusMin);
                    $("#piEcoGoalDMinusMax").val(request.sendData.economy.piEcoGoalDMinusMax);
                    $("#piEcoGoalEMax").val(request.sendData.economy.piEcoGoalEMax);

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

// 정책성
function policySettingSave(){

    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        const $piPolicyValidityA = $("#piPolicyValidityA");
        const $piPolicyValidityB = $("#piPolicyValidityB");
        const $piPolicyValidityC = $("#piPolicyValidityC");
        const $piPolicyValidityD = $("#piPolicyValidityD");
        if($piPolicyValidityA.val()===""){
            $piPolicyValidityA.val("100")
        }
        if($piPolicyValidityB.val()===""){
            $piPolicyValidityB.val("80")
        }
        if($piPolicyValidityC.val()===""){
            $piPolicyValidityC.val("30")
        }
        if($piPolicyValidityD.val()===""){
            $piPolicyValidityD.val("0")
        }

        const $piPolicyResponValueA = $("#piPolicyResponValueA");
        const $piPolicyResponValueB = $("#piPolicyResponValueB");
        const $piPolicyResponValueC = $("#piPolicyResponValueC");
        const $piPolicyResponScoreA = $("#piPolicyResponScoreA");
        const $piPolicyResponScoreB = $("#piPolicyResponScoreB");
        const $piPolicyResponScoreC = $("#piPolicyResponScoreC");
        if($piPolicyResponValueA.val()===""){
            $piPolicyResponValueA.val("3")
        }
        if($piPolicyResponValueB.val()===""){
            $piPolicyResponValueB.val("1")
        }
        if($piPolicyResponValueC.val()===""){
            $piPolicyResponValueC.val("0")
        }
        if($piPolicyResponScoreA.val()===""){
            $piPolicyResponScoreA.val("100")
        }
        if($piPolicyResponScoreB.val()===""){
            $piPolicyResponScoreB.val("50")
        }
        if($piPolicyResponScoreC.val()===""){
            $piPolicyResponScoreC.val("30")
        }

        const piPolicyVersatilityAMin = $("#piPolicyVersatilityAMin");
        const piPolicyVersatilityAScore = $("#piPolicyVersatilityAScore");
        const piPolicyVersatilityBMin = $("#piPolicyVersatilityBMin");
        const piPolicyVersatilityBMax = $("#piPolicyVersatilityBMax");
        const piPolicyVersatilityBScore = $("#piPolicyVersatilityBScore");
        const piPolicyVersatilityCMin = $("#piPolicyVersatilityCMin");
        const piPolicyVersatilityCMax = $("#piPolicyVersatilityCMax");
        const piPolicyVersatilityCScore = $("#piPolicyVersatilityCScore");
        const piPolicyVersatilityDMin = $("#piPolicyVersatilityDMin");
        const piPolicyVersatilityDMax = $("#piPolicyVersatilityDMax");
        const piPolicyVersatilityDScore = $("#piPolicyVersatilityDScore");
        const piPolicyVersatilityEMax = $("#piPolicyVersatilityEMax");
        const piPolicyVersatilityEScore = $("#piPolicyVersatilityEScore");
        if(piPolicyVersatilityAMin.val()===""){
            piPolicyVersatilityAMin.val("20000")
        }
        if(piPolicyVersatilityAScore.val()===""){
            piPolicyVersatilityAScore.val("100")
        }
        if(piPolicyVersatilityBMin.val()===""){
            piPolicyVersatilityBMin.val("10000")
        }
        if(piPolicyVersatilityBMax.val()===""){
            piPolicyVersatilityBMax.val("19999")
        }
        if(piPolicyVersatilityBScore.val()===""){
            piPolicyVersatilityBScore.val("80")
        }
        if(piPolicyVersatilityCMin.val()===""){
            piPolicyVersatilityCMin.val("5000")
        }
        if(piPolicyVersatilityCMax.val()===""){
            piPolicyVersatilityCMax.val("9999")
        }
        if(piPolicyVersatilityCScore.val()===""){
            piPolicyVersatilityCScore.val("60")
        }
        if(piPolicyVersatilityDMin.val()===""){
            piPolicyVersatilityDMin.val("3000")
        }
        if(piPolicyVersatilityDMax.val()===""){
            piPolicyVersatilityDMax.val("4999")
        }
        if(piPolicyVersatilityDScore.val()===""){
            piPolicyVersatilityDScore.val("50")
        }
        if(piPolicyVersatilityEMax.val()===""){
            piPolicyVersatilityEMax.val("2999")
        }
        if(piPolicyVersatilityEScore.val()===""){
            piPolicyVersatilityEScore.val("30")
        }

        const $piPolicyGoalAPlusMin = $("#piPolicyGoalAPlusMin");
        const $piPolicyGoalAPlusMax = $("#piPolicyGoalAPlusMax");
        const $piPolicyGoalAMinusMin = $("#piPolicyGoalAMinusMin");
        const $piPolicyGoalAMinusMax = $("#piPolicyGoalAMinusMax");
        const $piPolicyGoalBPlusMin = $("#piPolicyGoalBPlusMin");
        const $piPolicyGoalBPlusMax = $("#piPolicyGoalBPlusMax");
        const $piPolicyGoalBMinusMin = $("#piPolicyGoalBMinusMin");
        const $piPolicyGoalBMinusMax = $("#piPolicyGoalBMinusMax");
        const $piPolicyGoalCPlusMin = $("#piPolicyGoalCPlusMin");
        const $piPolicyGoalCPlusMax = $("#piPolicyGoalCPlusMax");
        const $piPolicyGoalCMinusMin = $("#piPolicyGoalCMinusMin");
        const $piPolicyGoalCMinusMax = $("#piPolicyGoalCMinusMax");
        const $piPolicyGoalDPlusMin = $("#piPolicyGoalDPlusMin");
        const $piPolicyGoalDPlusMax = $("#piPolicyGoalDPlusMax");
        const $piPolicyGoalDMinusMin = $("#piPolicyGoalDMinusMin");
        const $piPolicyGoalDMinusMax = $("#piPolicyGoalDMinusMax");
        const $piPolicyGoalEMax = $("#piPolicyGoalEMax");

        if($piPolicyGoalAPlusMin.val()===""){
            $piPolicyGoalAPlusMin.val("90")
        }
        if($piPolicyGoalAPlusMax.val()===""){
            $piPolicyGoalAPlusMax.val("100")
        }
        if($piPolicyGoalAMinusMin.val()===""){
            $piPolicyGoalAMinusMin.val("80")
        }
        if($piPolicyGoalAMinusMax.val()===""){
            $piPolicyGoalAMinusMax.val("89")
        }
        if($piPolicyGoalBPlusMin.val()===""){
            $piPolicyGoalBPlusMin.val("70")
        }
        if($piPolicyGoalBPlusMax.val()===""){
            $piPolicyGoalBPlusMax.val("79")
        }
        if($piPolicyGoalBMinusMin.val()===""){
            $piPolicyGoalBMinusMin.val("60")
        }
        if($piPolicyGoalBMinusMax.val()===""){
            $piPolicyGoalBMinusMax.val("69")
        }
        if($piPolicyGoalCPlusMin.val()===""){
            $piPolicyGoalCPlusMin.val("55")
        }
        if($piPolicyGoalCPlusMax.val()===""){
            $piPolicyGoalCPlusMax.val("59")
        }
        if($piPolicyGoalCMinusMin.val()===""){
            $piPolicyGoalCMinusMin.val("50")
        }
        if($piPolicyGoalCMinusMax.val()===""){
            $piPolicyGoalCMinusMax.val("54")
        }
        if($piPolicyGoalDPlusMin.val()===""){
            $piPolicyGoalDPlusMin.val("45")
        }
        if($piPolicyGoalDPlusMax.val()===""){
            $piPolicyGoalDPlusMax.val("49")
        }
        if($piPolicyGoalDMinusMin.val()===""){
            $piPolicyGoalDMinusMin.val("40")
        }
        if($piPolicyGoalDMinusMax.val()===""){
            $piPolicyGoalDMinusMax.val("44")
        }
        if($piPolicyGoalEMax.val()===""){
            $piPolicyGoalEMax.val("39")
        }

        const formData = new FormData(document.getElementById('policyForm'))

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/policySave"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'POST',
            data : formData,
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
                    // console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {
                    // console.log("적용완료");
                    alertSuccess("적용 완료했습니다.");
                    policySettingData();
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

// 정책성 데이터 호출
function policySettingData(){
    JWT_Get();

    let url;

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else if (accessToken == null) {
        refreshTokenCookie();
    } else {

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/performance/reference/policyData"; // 호출할 백엔드 API
        // console.log("url : " + url);
        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
            },
            error: function (request) {
                if (request.status === 500) {
                    // console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                }else if(request.status === 400) {
                    // console.log("request.status : " + request.status + " => 400에러");
                    alertCaution("400에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (request) {
                let status = request.status;
                // console.log("status : " + status);
                if (status === 200) {

                    $("#piPolicyValidityA").val(request.sendData.policy.piPolicyValidityA);
                    $("#piPolicyValidityB").val(request.sendData.policy.piPolicyValidityB);
                    $("#piPolicyValidityC").val(request.sendData.policy.piPolicyValidityC);
                    $("#piPolicyValidityD").val(request.sendData.policy.piPolicyValidityD);

                    $("#piPolicyResponValueA").val(request.sendData.policy.piPolicyResponValueA);
                    $("#piPolicyResponValueB").val(request.sendData.policy.piPolicyResponValueB);
                    $("#piPolicyResponValueC").val(request.sendData.policy.piPolicyResponValueC);
                    $("#piPolicyResponScoreA").val(request.sendData.policy.piPolicyResponScoreA);
                    $("#piPolicyResponScoreB").val(request.sendData.policy.piPolicyResponScoreB);
                    $("#piPolicyResponScoreC").val(request.sendData.policy.piPolicyResponScoreC);

                    $("#piPolicyVersatilityAMin").val(request.sendData.policy.piPolicyVersatilityAMin);
                    $("#piPolicyVersatilityAScore").val(request.sendData.policy.piPolicyVersatilityAScore);
                    $("#piPolicyVersatilityBMin").val(request.sendData.policy.piPolicyVersatilityBMin);
                    $("#piPolicyVersatilityBMax").val(request.sendData.policy.piPolicyVersatilityBMax);
                    $("#piPolicyVersatilityBScore").val(request.sendData.policy.piPolicyVersatilityBScore);
                    $("#piPolicyVersatilityCMin").val(request.sendData.policy.piPolicyVersatilityCMin);
                    $("#piPolicyVersatilityCMax").val(request.sendData.policy.piPolicyVersatilityCMax);
                    $("#piPolicyVersatilityCScore").val(request.sendData.policy.piPolicyVersatilityCScore);
                    $("#piPolicyVersatilityDMin").val(request.sendData.policy.piPolicyVersatilityDMin);
                    $("#piPolicyVersatilityDMax").val(request.sendData.policy.piPolicyVersatilityDMax);
                    $("#piPolicyVersatilityDScore").val(request.sendData.policy.piPolicyVersatilityDScore);
                    $("#piPolicyVersatilityEMax").val(request.sendData.policy.piPolicyVersatilityEMax);
                    $("#piPolicyVersatilityEScore").val(request.sendData.policy.piPolicyVersatilityEScore);

                    $("#piPolicyGoalAPlusMin").val(request.sendData.policy.piPolicyGoalAPlusMin);
                    $("#piPolicyGoalAPlusMax").val(request.sendData.policy.piPolicyGoalAPlusMax);
                    $("#piPolicyGoalAMinusMin").val(request.sendData.policy.piPolicyGoalAMinusMin);
                    $("#piPolicyGoalAMinusMax").val(request.sendData.policy.piPolicyGoalAMinusMax);
                    $("#piPolicyGoalBPlusMin").val(request.sendData.policy.piPolicyGoalBPlusMin);
                    $("#piPolicyGoalBPlusMax").val(request.sendData.policy.piPolicyGoalBPlusMax);
                    $("#piPolicyGoalBMinusMin").val(request.sendData.policy.piPolicyGoalBMinusMin);
                    $("#piPolicyGoalBMinusMax").val(request.sendData.policy.piPolicyGoalBMinusMax);
                    $("#piPolicyGoalCPlusMin").val(request.sendData.policy.piPolicyGoalCPlusMin);
                    $("#piPolicyGoalCPlusMax").val(request.sendData.policy.piPolicyGoalCPlusMax);
                    $("#piPolicyGoalCMinusMin").val(request.sendData.policy.piPolicyGoalCMinusMin);
                    $("#piPolicyGoalCMinusMax").val(request.sendData.policy.piPolicyGoalCMinusMax);
                    $("#piPolicyGoalDPlusMin").val(request.sendData.policy.piPolicyGoalDPlusMin);
                    $("#piPolicyGoalDPlusMax").val(request.sendData.policy.piPolicyGoalDPlusMax);
                    $("#piPolicyGoalDMinusMin").val(request.sendData.policy.piPolicyGoalDMinusMin);
                    $("#piPolicyGoalDMinusMax").val(request.sendData.policy.piPolicyGoalDMinusMax);
                    $("#piPolicyGoalEMax").val(request.sendData.policy.piPolicyGoalEMax);

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

// 물가배수 등록
function priceSave(){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        let url;

        const params = {
            piYear: $("#piYear").val(),
            piPrice: $("#piPrice").val()
        };

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/price/save"; // 호출할 백엔드 API

        $.ajax({
            url: url,
            type: 'post',
            data: params,
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("JWT_AccessToken", accessToken);
                xhr.setRequestHeader("insert_id",insert_id);
            },
            error: function (request) {
                if (request.status === 500) {
                    // console.log("request.status : " + request.status + " => 500에러");
                    alertCaution("500에러 재로그인 해주세요.", 2);
                } else {
                    // console.log("request.status : " + request.status + " => 404에러");
                    alertCaution("404에러 재로그인 해주세요.", 2);
                }
            },
            success: function (res) {
                if (res.status === 200) {
                    $("#piYear").val("");
                    $("#piPrice").val("");
                    alertSuccess("물가배수를 등록했습니다.");
                    priceCallList(1,2);
                }else{
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

// 물가배수 조회
function priceCallList(page,num){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        // console.log("callinfo(userid)함수 : 토큰&리플레시&로그인한아이디 Null");
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    }else {

        if(num === 1){
            logreg(0,"기초정보","물가지수 리스트 조회",null);
        }
        let url;

        page = page - 1;
        if (page < 0) page = 0

        const perPage = 10;
        const perArea = 5;
        let totCnt = 0;

        const $tableListYearCost = $('#tableListYearCost');
        const $totalCnt = $('#totalCnt');

        const params = {
            piYearSearch: $("#piYearSearch").val(),
            piPriceSearch: $("#piPriceSearch").val()
        };

        $tableListYearCost.empty().append('<tr ><td colspan="3" align = "center">조회 중</td></tr>');
        $totalCnt.text('0');

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/price/list"; // 호출할 백엔드 API

        $.ajax({
            url: url + '?size=' + perPage + '&page=' + page,
            type: 'GET',
            data: params,
            cache: false,
            error: function (request) {
                ajaxErrorMsg(request);
            },
            success: function (res) {
                // console.log("리스트출력");
                if (res.status === 200) {
                    //화면 출력
                    totCnt = res.total_rows;
                    $("#pricePaging").jqueryPager({
                        pageSize: perPage,
                        pageBlock: perArea,
                        currentPage: page + 1,
                        pageTotal: totCnt,
                        clickEvent: 'priceCallList'
                    });

                    if (totCnt === 0) {
                        $tableListYearCost.empty().append('<tr class="t-c"><td colspan="3" align="center">조회된 데이터가 없습니다.</td></tr>');
                        return;
                    }

                    $totalCnt.text(totCnt);
                    let html = '';
                    $.each(res.datalist, function (key, value) {
                        html += '<tr>';
                        html += '<td >' + echoNull2Blank(value.piYear) + '</td>';
                        html += '<td >' + echoNull2Blank(value.piPrice) + '</td>';
                        html += '<td ><button class="c-button" onclick="priceDel(\'' + echoNull2Blank(value.id) + '\');">삭제</button></td>';
                        html += '</tr>';
                    });
                    $tableListYearCost.html(html);
                }
            }
        });
    }
}

// 물가배수 삭제조회
function priceDel(id){
    JWT_Get();

    if (accessToken == null && refreshToken == null && insert_id == null) {
        alertCaution("토큰이 만료되었습니다.<BR>다시 로그인해주세요.", 2);
    } else {

        let url;

        const params = {
            id: id
        };

        url = $("#backend_protocol").val() + "://" + $("#backend_url").val() + "/api/price/del"; // 호출할 백엔드 API

        $.ajax({
            url: url,
            type: 'post',
            data: params,
            cache: false,
            error: function (request) {
                ajaxErrorMsg(request);
            },
            success: function (res) {
                console.log("리스트출력");
                if (res.status === 200) {
                    alertSuccess("삭제가 완료되었습니다.");
                    priceCallList(1,2);
                }
            }
        });
    }
}