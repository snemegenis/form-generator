package report;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.Collection;
import java.util.Map;

/**
 * Created by liutkvai on 6/27/2016.
 */
public class JasperReportGeneratorImpl implements ReportGenerator{

	private String suffix;
	private String path;

	public JasperReportGeneratorImpl(String path, String suffix) {
		this.path = path;
		this.suffix = suffix;
	}

	public byte[] generate(String report, Map<String, Object> parameters, Collection<?> data) {
		try {
			JasperDesign jasperDesign = JRXmlLoader.load(new ClassPathResource(path+report+suffix).getInputStream());
			JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
			return JasperRunManager.runReportToPdf(jasperReport, parameters,
					new JRBeanCollectionDataSource(data));
		} catch (JRException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
