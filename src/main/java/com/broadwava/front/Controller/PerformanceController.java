package com.broadwava.front.Controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Minkyu
 * Date : 2021-07-09
 * Remark : NEWDEAL 성능개선사업평가 컨트롤러
 */
@Slf4j
@Controller
@RequestMapping("/performance")
public class PerformanceController{

    // 호스트링크주입
    @Value("${newdeal.api.backend_url}")
    private String backend_url;

    // 성능개선사업평가 Iutput-1
    @RequestMapping("input")
    public String input(Model model){
        model.addAttribute("backend_url", backend_url);
        return "performance/input";
    }

    // 성능개선사업평가 Iutput-2
    @RequestMapping("performance1")
    public String performance1(){
        return "performance/performance1";
    }

    // 성능개선사업평가 Iutput-3
    @RequestMapping("performance2")
    public String performance2(){
        return "performance/performance2";
    }

    // 성능개선사업평가 Iutput-4
    @RequestMapping("performance3")
    public String performance3(){
        return "performance/performance3";
    }

    // 성능개선사업평가 Output
    @RequestMapping("output/{autoNum}")
    public String output(Model model,@PathVariable String autoNum){
        model.addAttribute("autoNum", autoNum);
        return "performance/output";
    }

//    @Value("${base.securityfiles.directory}")
//    private String securityfile;
//    private static final String APPLICATION_PDF = "application/xls";
//    //엑셀파일 양식 다운로드
//    @RequestMapping(value ="/GuideLine", method = RequestMethod.GET, produces = APPLICATION_PDF)
//    public @ResponseBody void guideLine(HttpServletResponse response) throws IOException {
//        File file = getFile();
//        InputStream in = new FileInputStream(file);
//        response.setContentType(APPLICATION_PDF);
//        response.setHeader("Content-Disposition", "attachment; filename=" + file.getName());
//        response.setHeader("Content-Length", String.valueOf(file.length()));
//        FileCopyUtils.copy(in, response.getOutputStream());
//    }

}
