package controller;

import mapper.PatientMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import service.PatientService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by liutkvai on 11/20/2017.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PatientController.class)
@AutoConfigureMockMvc
public class PatientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean(name="patientService")
    private PatientService patientService;

    @MockBean
    private PatientMapper patientMapper;

    @Test
    public void testFailure() throws Exception {

        Mockito.doReturn(null).when(patientService).get(1);

        MockHttpServletRequestBuilder saveRequest = get("/patient/list").
                contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(saveRequest).andExpect(status().isOk());
    }
}