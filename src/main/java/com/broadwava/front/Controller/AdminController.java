package com.broadwava.front.Controller;

import com.broadwava.front.Enum.AccountRole;
import com.broadwava.front.bscodes.CodeType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/admin")
public class AdminController {

    //호스트링크주입
    @Value("${newdeal.api.backend_url}")
    private String backend_url;

    //호스트링크주입
    @Value("${newdeal.api.backend_protocol}")
    private String backend_protocol;

    @RequestMapping("accountreg")
    public String accountreg(Model model){
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "admin/accountreg";
    }

    @RequestMapping("teamreg")
    public String teamreg(Model model){
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "admin/teamreg";
    }

    //관리코드등록
    @RequestMapping("mastercodereg")
    public String masterCodeReg(Model model){
        model.addAttribute("codetypes", CodeType.values());
        model.addAttribute("backend_url", backend_url);
        model.addAttribute("backend_protocol", backend_protocol);
        return "admin/mastercodereg";
    }

}
