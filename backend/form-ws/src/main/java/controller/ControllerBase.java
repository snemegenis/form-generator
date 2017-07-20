package controller;

import org.springframework.http.HttpHeaders;

/**
 * Created by liutkvai on 1/11/2017.
 */
public abstract class ControllerBase {

    protected HttpHeaders addHeaders(HttpHeaders headers) {
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        return headers;
    }

}
