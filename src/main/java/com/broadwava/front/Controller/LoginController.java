package com.broadwava.front.Controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
public class LoginController {

    //호스트링크주입
    @Value("${newdeal.api.security_url}")
    private String security_url;

    //호스트링크주입
    @Value("${newdeal.api.security_protocol}")
    private String security_protocol;

    @RequestMapping("login")
    public String loginForm(Model model){
        model.addAttribute("security_url", security_url);
        model.addAttribute("security_protocol", security_protocol);
        return "loginForm";
    }

}
