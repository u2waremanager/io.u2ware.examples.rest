package backend;

import java.util.stream.Stream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.security.config.crypto.RsaKeyConversionServicePostProcessor;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc
class ApplicationTests {

	protected Log logger = LogFactory.getLog(getClass());

	@Autowired
	private MockMvc mvc;


	@Autowired
	private ApplicationContext ac;


	@Test
	void contextLoads() throws Exception {

		mvc
				.perform(
						MockMvcRequestBuilders.get("/api")
				)
				.andExpect(
						MockMvcResultMatchers.status().is2xxSuccessful()
				)
				.andDo(
						MockMvcResultHandlers.print(System.err)
				);

	}

}
