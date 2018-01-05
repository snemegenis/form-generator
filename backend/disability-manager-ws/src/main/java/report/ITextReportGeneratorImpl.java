package report;

import bean.*;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import constants.ReportConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;
import util.CommonHelper;
import util.DateHelper;
import util.StringHelper;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.*;
import java.util.List;

/**
 * Created by vaidelius on 16.7.3.
 */
@Component
public class ITextReportGeneratorImpl implements ReportGenerator {

    @Autowired
    @Qualifier("disabilityReportMessages")
    private MessageSource bundle;

    public static final String SPACING_BEFORE = "   ";
    public static final String SPACING_AFTER = "     ";

    static class PdfPageEventHelperWithActivation extends PdfPageEventHelper {
        public boolean active;

        public void setActive(boolean active) {
            this.active = active;
        }

    }

    static class FooterTable extends PdfPageEventHelper {
        private PdfPTable footer;
        private boolean print;

        public void setPrint(boolean print) {
            this.print = print;
        }

        public FooterTable(PdfPTable footer) {
            this.footer = footer;
        }

        public void onEndPage(PdfWriter writer, Document document) {
            if (print) {
                footer.writeSelectedRows(0, 2, 36, 64, writer.getDirectContent());
            }
        }
    }

    static class DottedCell implements PdfPCellEvent {
        private int border = 0;

        public DottedCell(int border) {
            this.border = border;
        }

        public void cellLayout(PdfPCell cell, Rectangle position, PdfContentByte[] canvases) {
            PdfContentByte canvas = canvases[PdfPTable.LINECANVAS];
            canvas.saveState();
            canvas.setLineDash(0, 4, 2);
            if ((border & PdfPCell.TOP) == PdfPCell.TOP) {
                canvas.moveTo(position.getRight(), position.getTop());
                canvas.lineTo(position.getLeft(), position.getTop());
            }
            if ((border & PdfPCell.BOTTOM) == PdfPCell.BOTTOM) {
                canvas.moveTo(position.getRight(), position.getBottom());
                canvas.lineTo(position.getLeft(), position.getBottom());
            }
            if ((border & PdfPCell.RIGHT) == PdfPCell.RIGHT) {
                canvas.moveTo(position.getRight(), position.getTop());
                canvas.lineTo(position.getRight(), position.getBottom());
            }
            if ((border & PdfPCell.LEFT) == PdfPCell.LEFT) {
                canvas.moveTo(position.getLeft(), position.getTop());
                canvas.lineTo(position.getLeft(), position.getBottom());
            }
            canvas.stroke();
            canvas.restoreState();
        }
    }

    static class DashedLine extends PdfPageEventHelperWithActivation {

        @Override
        public void onGenericTag(PdfWriter writer, Document document, Rectangle rect, String text) {
            PdfContentByte canvas = writer.getDirectContent();
            canvas.saveState();
            canvas.setLineDash(1, 1);
            canvas.moveTo(rect.getLeft(), rect.getBottom() - 3);
            canvas.lineTo(rect.getRight(), rect.getBottom() - 3);
            canvas.stroke();
            canvas.restoreState();
        }
    }

    static class ParagraphBorder extends PdfPageEventHelperWithActivation {

        public float paddingTop = 0;
        public float paddingBottom = 0;
        public float startPosition;
        public boolean newPageCalled;

        public void setPadding(float padding) {
            setPaddingTop(padding);
            setPaddingBottom(padding);
        }

        public void setPaddingTop(float paddingTop) {
            this.paddingTop = paddingTop;
        }

        public void setPaddingBottom(float paddingBottom) {
            this.paddingBottom = paddingBottom;
        }

        private void print(PdfWriter writer, Document document, float endPosition, float paddingTop,
                float paddingBottom, int border) {
            PdfContentByte cb = writer.getDirectContentUnder();
            Rectangle rectangle = new Rectangle(document.left(), endPosition - paddingBottom,
                    document.right() - document.left() + document.leftMargin(), startPosition + paddingTop);
            rectangle.setBorder(border);
            rectangle.setBorderWidth(0.5f);
            cb.rectangle(rectangle);
            cb.stroke();
        }

        @Override
        public void onParagraph(PdfWriter writer, Document document, float paragraphPosition) {
            if (active) {
                this.startPosition = paragraphPosition;
            }
        }

        @Override
        public void onEndPage(PdfWriter writer, Document document) {
            if (active) {
                float paragraphPosition = document.bottomMargin();
                print(writer, document, paragraphPosition, newPageCalled ? 0 : paddingTop, 0, newPageCalled ?
                        Rectangle.LEFT | Rectangle.RIGHT :
                        Rectangle.TOP | Rectangle.LEFT | Rectangle.RIGHT);
                newPageCalled = true;
            }
        }

        @Override
        public void onStartPage(PdfWriter writer, Document document) {
            if (active) {
                Rectangle pageSize = document.getPageSize();
                startPosition = pageSize.getHeight() - document.topMargin();
            }
        }

        @Override
        public void onParagraphEnd(PdfWriter writer, Document document, float paragraphPosition) {
            if (active) {
                print(writer, document, paragraphPosition, newPageCalled ? 0 : paddingTop, paddingBottom,
                        newPageCalled ? Rectangle.BOTTOM | Rectangle.LEFT | Rectangle.RIGHT : Rectangle.BOX);
                newPageCalled = false;
            }
        }
    }

    @Override
    public byte[] generate(String reportCode, Map<String, Object> parameters, Collection<?> data) throws Exception {
        if (ReportConstants.DISABILITY_REPORT_CODE.equals(reportCode)) {
            if (!data.isEmpty()) {
                Object disabilityReport = data.iterator().next();
                if (disabilityReport != null && disabilityReport instanceof DisabilityReport) {
                    return buildDisabilityReport((DisabilityReport) disabilityReport, parameters);
                }
            }
        }
        return null;
    }

    private byte[] buildDisabilityReport(DisabilityReport disabilityReport, Map<String, Object> parameters)
            throws Exception {
        float left = 20;
        float right = 20;
        float top = 15;
        float bottom = 15;
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4, left, right, top, bottom);
            PdfWriter writer = null;
            try {
                writer = PdfWriter.getInstance(document, byteArrayOutputStream);
                Image checkedImage = Image.getInstance(
                        ITextReportGeneratorImpl.class.getResource("/checkbox-checked.png"));
                checkedImage.setAlignment(Element.ALIGN_RIGHT);
                Image uncheckedImage = Image.getInstance(
                        ITextReportGeneratorImpl.class.getResource("/checkbox-unchecked.png"));
                uncheckedImage.setAlignment(Element.ALIGN_RIGHT);

                DashedLine dashedLine = new DashedLine();
                writer.setPageEvent(dashedLine);
                ParagraphBorder paragraphBorder = new ParagraphBorder();
                writer.setPageEvent(paragraphBorder);

                Font fontNormal = FontFactory.getFont("HELVETICA", "Cp1257", true, 10);
                Font fontNormalBold = FontFactory.getFont("HELVETICA", "Cp1257", true, 10, Font.BOLD);
                Font fontNormalUnderLine = FontFactory.getFont("HELVETICA", "Cp1257", true, 10, Font.UNDERLINE);
                Font fontLargeBold = FontFactory.getFont("HELVETICA", "Cp1257", true, 12, Font.BOLD);
                Font fontSmaller = FontFactory.getFont("HELVETICA", "Cp1257", true, 6);
                Font fontSmall = FontFactory.getFont("HELVETICA", "Cp1257", true, 8);

                // Last page footer
                PdfPTable footerTable = new PdfPTable(1);
                footerTable.setTotalWidth(
                        document.right() - document.left() - document.rightMargin() - document.leftMargin());
                footerTable.addCell(getCell(getBundleMessage("explanation.1"), fontSmaller, Element.ALIGN_JUSTIFIED, 6,
                        Rectangle.TOP, 1, 2));
                footerTable.addCell(getCell(getBundleMessage("explanation.2"), fontSmaller, Element.ALIGN_JUSTIFIED, 6,
                        Rectangle.NO_BORDER, 1, 2));

                FooterTable footerEvent = new FooterTable(footerTable);
                writer.setPageEvent(footerEvent);

                document.open();
                document.setMargins(left, right, top, bottom);

                // Header
                PdfPTable headerTable = new PdfPTable(new float[] { 80, 20 });
                headerTable.setWidthPercentage(100);
                headerTable.addCell(getCell("", fontSmall, Element.ALIGN_LEFT, 10, Rectangle.NO_BORDER, 1, 0));
                headerTable.addCell(
                        getCell(getBundleMessage("header"), fontSmall, Element.ALIGN_RIGHT, 10, Rectangle.NO_BORDER, 1,
                                0));
                document.add(headerTable);

                Paragraph company = new Paragraph(12, getBundleMessage("company"), fontNormal);
                company.setSpacingBefore(5);
                company.setAlignment(Element.ALIGN_CENTER);
                paragraphBorder.setPaddingBottom(4);
                paragraphBorder.setActive(true);
                document.add(company);
                paragraphBorder.setActive(false);

                Paragraph companyField = new Paragraph(12, getBundleMessage("label.company"), fontSmall);
                companyField.setAlignment(Element.ALIGN_CENTER);
                document.add(companyField);

                // Title
                Paragraph title1 = new Paragraph(12, getBundleMessage("title1"), fontLargeBold);
                title1.setSpacingBefore(13);
                title1.setAlignment(Element.ALIGN_CENTER);
                document.add(title1);

                Paragraph title2 = new Paragraph(12, getBundleMessage("title2"), fontNormal);
                title2.setAlignment(Element.ALIGN_CENTER);
                document.add(title2);

                // Date and number
                LocalDate reportDate = CommonHelper.valueOrDefault(
                        (LocalDate) parameters.get(ReportConstants.PARAM_DATE), LocalDate.now());
                boolean printDate = CommonHelper.valueOrDefault(
                        (Boolean) parameters.get(ReportConstants.PARAM_PRINT_DATE), false);
                int reportNbr = CommonHelper.valueOrDefault((Integer) parameters.get(ReportConstants.PARAM_NBR), 0);
                boolean printNbr = CommonHelper.valueOrDefault(
                        (Boolean) parameters.get(ReportConstants.PARAM_PRINT_NBR), false);

                PdfPTable dateAndNbrTable = new PdfPTable(new float[] { 14, 32, 9, 32, 8 });
                dateAndNbrTable.setSpacingBefore(8);
                dateAndNbrTable.setWidthPercentage(50);
                dateAndNbrTable.addCell(
                        getCell(getBundleMessage("date"), fontNormal, Element.ALIGN_RIGHT, 8, Rectangle.NO_BORDER, 1,
                                5));
                dateAndNbrTable.addCell(
                        getCell(printDate ? reportDate.format(ReportConstants.DATE_FORMAT) : "", fontNormal,
                                Element.ALIGN_CENTER, 8, Rectangle.BOX, 1, 5));
                dateAndNbrTable.addCell(
                        getCell(getBundleMessage("nbr"), fontNormal, Element.ALIGN_RIGHT, 8, Rectangle.NO_BORDER, 1,
                                5));
                dateAndNbrTable.addCell(
                        getCell(printNbr ? String.valueOf(reportNbr) : "", fontNormal, Element.ALIGN_CENTER, 8,
                                Rectangle.BOX, 1, 5));
                dateAndNbrTable.addCell(getCell("", fontNormal, Element.ALIGN_LEFT, 8, Rectangle.NO_BORDER, 1, 5));
                document.add(dateAndNbrTable);

                // Name and birth date
                float[] nameAndBirthDateCols = new float[12];
                Arrays.fill(nameAndBirthDateCols, 3f);
                nameAndBirthDateCols[0] = 50;
                PdfPTable nameAndBirthDateTable = new PdfPTable(nameAndBirthDateCols);
                nameAndBirthDateTable.setSpacingBefore(20);
                nameAndBirthDateTable.setWidthPercentage(100);

                Patient patient = disabilityReport.getPatient();

                nameAndBirthDateTable.addCell(
                        getCell(patient.getFirstName() + ", " + patient.getLastName(), fontNormal, Element.ALIGN_CENTER,
                                8, Rectangle.BOX, 1, 5));
                for (int i = 0; i < 11; i++) {
                    nameAndBirthDateTable.addCell(
                            getCell(patient.getPersonalId().substring(0 + i, 1 + i), fontNormal, Element.ALIGN_CENTER,
                                    7, Rectangle.BOX, 1, 5));
                }
                nameAndBirthDateTable.addCell(
                        getCell(getBundleMessage("age"), fontNormalBold, Element.ALIGN_RIGHT, 7, Rectangle.BOX, 1, 5));
                String years = StringHelper.padLeft(
                        String.valueOf(DateHelper.getYearsOnDate(patient.getBirthDate(), reportDate)), 3, "0");
                String months = StringHelper.padLeft(
                        String.valueOf(DateHelper.getMonthsOnDate(patient.getBirthDate(), reportDate)), 2, "0");
                for (int i = 0; i < 3; i++) {
                    nameAndBirthDateTable.addCell(
                            getCell(years.substring(0 + i, 1 + i), fontNormal, Element.ALIGN_CENTER, 7, Rectangle.BOX,
                                    1, 5));
                }
                nameAndBirthDateTable.addCell(
                        getCell(getBundleMessage("years"), fontNormal, Element.ALIGN_CENTER, 7, Rectangle.BOX, 3, 5));
                for (int i = 0; i < 2; i++) {
                    nameAndBirthDateTable.addCell(
                            getCell(months.substring(0 + i, 1 + i), fontNormal, Element.ALIGN_CENTER, 7, Rectangle.BOX,
                                    1, 5));
                }
                nameAndBirthDateTable.addCell(
                        getCell(getBundleMessage("months"), fontNormal, Element.ALIGN_CENTER, 7, Rectangle.BOX, 3, 5));
                document.add(nameAndBirthDateTable);

                // Address
                Paragraph paragraphAddress = new Paragraph(13);
                paragraphAddress.setSpacingBefore(15);
                Chunk addressLabel = new Chunk(getBundleMessage("address") + SPACING_BEFORE, fontNormal);
                Chunk address = new Chunk(patient.getAddress(), fontNormalUnderLine);
                paragraphAddress.add(addressLabel);
                paragraphAddress.add(address);
                document.add(paragraphAddress);

                // telephones and email
                Paragraph paragraphPhoneAndEmail = new Paragraph(13);
                paragraphPhoneAndEmail.setSpacingBefore(4);
                Chunk phoneLabel = new Chunk(getBundleMessage("phone") + SPACING_BEFORE, fontNormal);
                Chunk phone = new Chunk(getMessageOrEmpty(patient.getPhone()), fontNormalUnderLine);
                Chunk spacing = new Chunk(SPACING_AFTER, fontNormal);
                paragraphPhoneAndEmail.add(phoneLabel);
                paragraphPhoneAndEmail.add(phone);
                paragraphPhoneAndEmail.add(spacing);
                Chunk mobilePhoneLabel = new Chunk(getBundleMessage("mobile.phone") + SPACING_BEFORE, fontNormal);
                Chunk mobilePhone = new Chunk(getMessageOrEmpty(patient.getMobilePhone()), fontNormalUnderLine);
                paragraphPhoneAndEmail.add(mobilePhoneLabel);
                paragraphPhoneAndEmail.add(mobilePhone);
                paragraphPhoneAndEmail.add(spacing);
                Chunk emailLabel = new Chunk(getBundleMessage("email") + SPACING_BEFORE, fontNormal);
                Chunk email = new Chunk(getMessageOrEmpty(patient.getEmail()), fontNormalUnderLine);
                paragraphPhoneAndEmail.add(emailLabel);
                paragraphPhoneAndEmail.add(email);
                document.add(paragraphPhoneAndEmail);

                // Employer
                Paragraph paragraphEmployer = new Paragraph(13);
                paragraphEmployer.setSpacingBefore(4);
                Chunk employerLabel = new Chunk(getBundleMessage("employer") + SPACING_BEFORE, fontNormal);
                String employerText = getMessageOrEmpty(patient.getEmployer());
                Chunk employer = new Chunk(employerText, fontNormalUnderLine);
                paragraphEmployer.add(employerLabel);
                paragraphEmployer.add(employer);
                document.add(paragraphEmployer);

                // Occupation
                Paragraph paragraphOccupation = new Paragraph(13);
                paragraphOccupation.setSpacingBefore(4);
                Chunk occupationLabel = new Chunk(getBundleMessage("occupation") + SPACING_BEFORE, fontNormal);
                Chunk occupation = new Chunk(getMessageOrEmpty(patient.getOccupation()), fontNormalUnderLine);
                paragraphOccupation.add(occupationLabel);
                paragraphOccupation.add(occupation);
                document.add(paragraphOccupation);

                // history
                Paragraph paragraphHistoryLabel = new Paragraph(getBundleMessage("history"), fontNormal);
                paragraphHistoryLabel.setSpacingBefore(10);
                paragraphHistoryLabel.setExtraParagraphSpace(2);
                document.add(paragraphHistoryLabel);

                Paragraph paragraphHistory = new Paragraph(disabilityReport.getHistory(), fontNormal);
                paragraphHistory.setIndentationLeft(5);
                paragraphHistory.setIndentationRight(5);
                paragraphHistory.setSpacingBefore(5);
                paragraphHistory.setAlignment(Element.ALIGN_JUSTIFIED);
                paragraphBorder.setPadding(0);
                paragraphBorder.setPaddingBottom(8);
                paragraphBorder.setActive(true);
                document.add(paragraphHistory);
                paragraphBorder.setActive(false);

                // Treatment applied
                Set<Treatment> treatments = disabilityReport.getTreatments();
                Paragraph paragraphTreatment = new Paragraph(13, getBundleMessage("treatment"), fontNormal);
                paragraphTreatment.setSpacingBefore(10);
                document.add(paragraphTreatment);
                PdfPTable treatmentTable = new PdfPTable(new float[] { 4, 56, 4, 36 });
                treatmentTable.setWidthPercentage(100);
                treatmentTable.setSpacingBefore(4);

                PdfPCell cellTreatmentImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellTreatmentImg.addElement(treatments.contains(Treatment.AMBULATORIC) ? checkedImage : uncheckedImage);
                treatmentTable.addCell(cellTreatmentImg);
                treatmentTable.addCell(
                        getCell(getBundleMessage("treatment.ambulatoric"), fontNormal, Element.ALIGN_LEFT, 12,
                                Rectangle.NO_BORDER, 1, 3));

                cellTreatmentImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellTreatmentImg.addElement(treatments.contains(Treatment.MEDICAMENTS) ? checkedImage : uncheckedImage);
                treatmentTable.addCell(cellTreatmentImg);
                treatmentTable.addCell(
                        getCell(getBundleMessage("treatment.medicaments"), fontNormal, Element.ALIGN_LEFT, 12,
                                Rectangle.NO_BORDER, 1, 3));

                cellTreatmentImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellTreatmentImg.addElement(treatments.contains(Treatment.STATIONARY) ? checkedImage : uncheckedImage);
                treatmentTable.addCell(cellTreatmentImg);
                treatmentTable.addCell(
                        getCell(getBundleMessage("treatment.stationary"), fontNormal, Element.ALIGN_LEFT, 12,
                                Rectangle.NO_BORDER, 1, 3));

                cellTreatmentImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellTreatmentImg.addElement(treatments.contains(Treatment.SURGERY) ? checkedImage : uncheckedImage);
                treatmentTable.addCell(cellTreatmentImg);
                treatmentTable.addCell(
                        getCell(getBundleMessage("treatment.surgery"), fontNormal, Element.ALIGN_LEFT, 12,
                                Rectangle.NO_BORDER, 1, 3));

                cellTreatmentImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellTreatmentImg.addElement(
                        treatments.contains(Treatment.REABILITATION) ? checkedImage : uncheckedImage);
                treatmentTable.addCell(cellTreatmentImg);
                treatmentTable.addCell(
                        getCell(getBundleMessage("treatment.reabilitation"), fontNormal, Element.ALIGN_LEFT, 12,
                                Rectangle.NO_BORDER, 3, 3));

                cellTreatmentImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellTreatmentImg.setLeading(12, 0);
                cellTreatmentImg.addElement(treatments.contains(Treatment.OTHER) ? checkedImage : uncheckedImage);
                treatmentTable.addCell(cellTreatmentImg);

                PdfPCell cellTreatmentOther = getPdfPCell(Rectangle.NO_BORDER, 3, 5);
                cellTreatmentOther.setPaddingTop(0);
                Paragraph paragraphTreatmentOther = new Paragraph(15);
                paragraphTreatmentOther.setAlignment(Element.ALIGN_JUSTIFIED);
                paragraphTreatmentOther.add(new Chunk(getBundleMessage("treatment.other"), fontNormal));
                if (treatments.contains(Treatment.OTHER)) {
                    paragraphTreatmentOther.add(new Chunk("  ", fontNormal));
                    paragraphTreatmentOther.add(new Chunk(disabilityReport.getOtherTreatment(), fontNormalUnderLine));
                }
                cellTreatmentOther.addElement(paragraphTreatmentOther);
                treatmentTable.addCell(cellTreatmentOther);

                document.add(treatmentTable);

                // treatment history
                Paragraph paragraphTreatmentHistoryLabel = new Paragraph(getBundleMessage("treatment.history"),
                        fontNormal);
                paragraphTreatmentHistoryLabel.setSpacingBefore(4);
                paragraphTreatmentHistoryLabel.setExtraParagraphSpace(2);
                document.add(paragraphTreatmentHistoryLabel);

                Paragraph paragraphTreatmentHistory = new Paragraph(disabilityReport.getTreatmentHistory(), fontNormal);
                paragraphTreatmentHistory.setIndentationLeft(5);
                paragraphTreatmentHistory.setIndentationRight(5);
                paragraphTreatmentHistory.setSpacingBefore(5);
                paragraphTreatmentHistory.setAlignment(Element.ALIGN_JUSTIFIED);
                paragraphBorder.setPaddingBottom(8);
                paragraphBorder.setActive(true);
                document.add(paragraphTreatmentHistory);
                paragraphBorder.setActive(false);

                // Appointments
                Paragraph paragraphAppointmentLabel = new Paragraph(getBundleMessage("appointments"), fontNormal);
                paragraphAppointmentLabel.setSpacingBefore(10);
                paragraphAppointmentLabel.setExtraParagraphSpace(2);
                document.add(paragraphAppointmentLabel);

                List<Appointment> appointments = disabilityReport.getAppointments();
                PdfPTable appointmentsTable = new PdfPTable(new float[] { 14, 31, 45, 10 });
                appointmentsTable.setWidthPercentage(100);
                appointmentsTable.setSpacingBefore(8);

                if (!appointments.isEmpty()) {
                    PdfPCell appointmentCell = getCell(getBundleMessage("appointments.date"), fontNormalBold,
                            Element.ALIGN_CENTER, 12, Rectangle.BOX, 1, 5);
                    appointmentCell.setPaddingTop(1);
                    appointmentsTable.addCell(appointmentCell);
                    appointmentCell = getCell(getBundleMessage("appointments.occupation"), fontNormalBold,
                            Element.ALIGN_CENTER, 12, Rectangle.BOX, 1, 5);

                    appointmentCell.setPaddingTop(1);
                    appointmentsTable.addCell(appointmentCell);
                    appointmentsTable.addCell(
                            getCell(getBundleMessage("appointments.details"), fontNormalBold, Element.ALIGN_CENTER, 12,
                                    Rectangle.BOX, 1, 5));
                    appointmentCell = getCell(getBundleMessage("appointments.attachments"), fontNormalBold,
                            Element.ALIGN_CENTER, 12, Rectangle.BOX, 1, 5);
                    appointmentCell.setPaddingTop(0);
                    appointmentsTable.addCell(appointmentCell);

                    for (Appointment appointment : appointments) {
                        appointmentCell = getCell(appointment.getDate().format(ReportConstants.DATE_FORMAT), fontNormal,
                                Element.ALIGN_CENTER, 12, Rectangle.BOX, 1, 5);
                        appointmentCell.setPaddingTop(0);
                        appointmentsTable.addCell(appointmentCell);

                        appointmentCell = getCell(appointment.getDoctorType(), fontNormal, Element.ALIGN_JUSTIFIED, 12,
                                Rectangle.BOX, 1, 5);
                        appointmentCell.setPaddingTop(0);
                        appointmentsTable.addCell(appointmentCell);

                        appointmentCell = getCell(appointment.getObservation(), fontNormal, Element.ALIGN_JUSTIFIED, 12,
                                Rectangle.BOX, 1, 5);
                        appointmentCell.setPaddingTop(0);
                        appointmentsTable.addCell(appointmentCell);

                        appointmentCell = getCell(getMessageOrEmpty(appointment.getAttachment()), fontNormal,
                                Element.ALIGN_CENTER, 12, Rectangle.BOX, 1, 5);
                        appointmentCell.setPaddingTop(0);
                        appointmentsTable.addCell(appointmentCell);

                    }
                }

                document.add(appointmentsTable);

                // Barthel index
                PdfPTable barthelIndexTable = new PdfPTable(new float[] { 22, 2, 15, 5, 10, 46 });
                barthelIndexTable.setSpacingBefore(12);
                barthelIndexTable.setWidthPercentage(100);

                PdfPCell barthelIndexCell = getPdfPCell(Rectangle.NO_BORDER, 1, 0);
                barthelIndexCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                barthelIndexCell.setPaddingRight(8);
                barthelIndexCell.setPaddingLeft(0);
                Paragraph paragraphBarthelIndex = new Paragraph(8);
                paragraphBarthelIndex.setIndentationLeft(0);
                paragraphBarthelIndex.add(new Chunk(getBundleMessage("barthel.index"), fontNormal));
                Chunk barthelIndexSubscript = new Chunk("1", fontSmaller);
                barthelIndexSubscript.setTextRise(5);
                paragraphBarthelIndex.add(barthelIndexSubscript);
                barthelIndexCell.addElement(paragraphBarthelIndex);
                barthelIndexTable.addCell(barthelIndexCell);

                barthelIndexTable.addCell(getCell("", fontNormal, Element.ALIGN_CENTER, 8, Rectangle.NO_BORDER, 1, 5));

                barthelIndexTable.addCell(getCell(disabilityReport.getBarthelIndex() == null ?
                                "-" :
                                String.valueOf(disabilityReport.getBarthelIndex()), fontNormal, Element.ALIGN_CENTER, 8,
                        Rectangle.BOX, 1, 5));

                barthelIndexTable.addCell(getCell("", fontNormal, Element.ALIGN_CENTER, 8, Rectangle.NO_BORDER, 1, 5));

                PdfPCell barthelIndexTableCell = getPdfPCell(Rectangle.BOX, 1, 5);
                Paragraph paragraphBarthelTableIndex = new Paragraph(8);
                paragraphBarthelTableIndex.setAlignment(Element.ALIGN_CENTER);
                paragraphBarthelTableIndex.add(new Chunk(getBundleMessage("barthel.index.table"), fontNormal));
                Chunk barthelIndexTableSubscript = new Chunk("2", fontSmaller);
                barthelIndexTableSubscript.setTextRise(5);
                paragraphBarthelTableIndex.add(barthelIndexTableSubscript);
                barthelIndexTableCell.addElement(paragraphBarthelTableIndex);
                barthelIndexTable.addCell(barthelIndexTableCell);

                barthelIndexTable.addCell(getCell("", fontNormal, Element.ALIGN_LEFT, 8, Rectangle.NO_BORDER, 1, 5));
                document.add(barthelIndexTable);

                // Temporary disability
                Paragraph paragraphTemporaryDisabilityLabel = new Paragraph(getBundleMessage("temporary.disability"),
                        fontNormal);
                paragraphTemporaryDisabilityLabel.setSpacingBefore(6);
                paragraphTemporaryDisabilityLabel.setExtraParagraphSpace(2);
                document.add(paragraphTemporaryDisabilityLabel);

                Paragraph paragraphTemporaryDisability = new Paragraph(
                        getMessageOrEmpty(disabilityReport.getLatestDisabilityDesc()), fontNormal);
                paragraphTemporaryDisability.setIndentationLeft(5);
                paragraphTemporaryDisability.setIndentationRight(5);
                paragraphTemporaryDisability.setSpacingBefore(6);
                paragraphTemporaryDisability.setAlignment(Element.ALIGN_JUSTIFIED);
                paragraphBorder.setPaddingBottom(8);
                paragraphBorder.setActive(true);
                document.add(paragraphTemporaryDisability);
                paragraphBorder.setActive(false);

                // Main diagnosis
                Diagnosis mainDiagnosis = disabilityReport.getMainDiagnosis();
                Paragraph paragraphMainDiagnosisLabel = new Paragraph(12, getBundleMessage("main.diagnosis"),
                        fontNormal);
                paragraphMainDiagnosisLabel.setSpacingBefore(16);
                document.add(paragraphMainDiagnosisLabel);

                Paragraph paragraphMainDiagnosisMainLine = new Paragraph(16);
                paragraphMainDiagnosisMainLine.setSpacingBefore(0);
                paragraphMainDiagnosisMainLine.add(new Chunk(getBundleMessage("diagnosis.code"), fontNormal));
                paragraphMainDiagnosisMainLine.add(new Chunk(" ", fontNormal));
                paragraphMainDiagnosisMainLine.add(new Chunk(mainDiagnosis.getCode(), fontNormalUnderLine));
                paragraphMainDiagnosisMainLine.add(new Chunk(" ", fontNormal));
                paragraphMainDiagnosisMainLine.add(new Chunk(getBundleMessage("diagnosis.text"), fontNormal));
                paragraphMainDiagnosisMainLine.add(new Chunk(" ", fontNormal));
                paragraphMainDiagnosisMainLine.add(new Chunk(mainDiagnosis.getText(), fontNormalUnderLine));
                document.add(paragraphMainDiagnosisMainLine);

                Paragraph paragraphMainDiagnosisSecondLine = new Paragraph(16);
                paragraphMainDiagnosisSecondLine.setSpacingBefore(0);
                paragraphMainDiagnosisSecondLine.add(
                        new Chunk(getBundleMessage("diagnosis.functional.class"), fontNormal));
                paragraphMainDiagnosisSecondLine.add(new Chunk(" ", fontNormal));
                paragraphMainDiagnosisSecondLine.add(
                        new Chunk(mainDiagnosis.getFunctionalClass(), fontNormalUnderLine));
                paragraphMainDiagnosisSecondLine.add(new Chunk(getBundleMessage("diagnosis.degree"), fontNormal));
                paragraphMainDiagnosisSecondLine.add(new Chunk(" ", fontNormal));
                paragraphMainDiagnosisSecondLine.add(new Chunk(mainDiagnosis.getDegree(), fontNormalUnderLine));
                paragraphMainDiagnosisSecondLine.add(new Chunk(getBundleMessage("diagnosis.stage"), fontNormal));
                paragraphMainDiagnosisSecondLine.add(new Chunk(" ", fontNormal));
                paragraphMainDiagnosisSecondLine.add(new Chunk(mainDiagnosis.getStage(), fontNormalUnderLine));
                paragraphMainDiagnosisSecondLine.add(new Chunk(getBundleMessage("diagnosis.history"), fontNormal));
                paragraphMainDiagnosisSecondLine.add(new Chunk(" ", fontNormal));
                paragraphMainDiagnosisSecondLine.add(new Chunk(mainDiagnosis.getHistory(), fontNormalUnderLine));
                document.add(paragraphMainDiagnosisSecondLine);

                // Other diagnosis
                Paragraph paragraphOtherDiagnosisLabel = new Paragraph(16, getBundleMessage("other.diagnosis"),
                        fontNormal);
                paragraphOtherDiagnosisLabel.setSpacingBefore(20);
                document.add(paragraphOtherDiagnosisLabel);

                List<Diagnosis> otherDiagnosisList = disabilityReport.getOtherDiagnosis();
                if (otherDiagnosisList != null && !otherDiagnosisList.isEmpty()) {

                    for (int i = 0; i < otherDiagnosisList.size(); i++) {

                        Diagnosis otherDiagnosis = otherDiagnosisList.get(i);

                        Paragraph paragraphOtherDiagnosisMainLine = new Paragraph(16);
                        paragraphOtherDiagnosisMainLine.add(new Chunk(getBundleMessage("diagnosis.code"), fontNormal));
                        paragraphOtherDiagnosisMainLine.add(new Chunk(" ", fontNormal));
                        paragraphOtherDiagnosisMainLine.add(new Chunk(otherDiagnosis.getCode(), fontNormalUnderLine));
                        paragraphOtherDiagnosisMainLine.add(new Chunk(" ", fontNormal));
                        paragraphOtherDiagnosisMainLine.add(new Chunk(getBundleMessage("diagnosis.text"), fontNormal));
                        paragraphOtherDiagnosisMainLine.add(new Chunk(" ", fontNormal));
                        paragraphOtherDiagnosisMainLine.add(new Chunk(otherDiagnosis.getText(), fontNormalUnderLine));
                        document.add(paragraphOtherDiagnosisMainLine);

                        Paragraph paragraphOtherDiagnosisSecondLine = new Paragraph(16);
                        paragraphOtherDiagnosisSecondLine.setSpacingBefore(0);
                        paragraphOtherDiagnosisSecondLine.add(
                                new Chunk(getBundleMessage("diagnosis.functional.class"), fontNormal));
                        paragraphOtherDiagnosisSecondLine.add(new Chunk(" ", fontNormal));
                        paragraphOtherDiagnosisSecondLine.add(
                                new Chunk(otherDiagnosis.getFunctionalClass(), fontNormalUnderLine));
                        paragraphOtherDiagnosisSecondLine.add(
                                new Chunk(getBundleMessage("diagnosis.degree"), fontNormal));
                        paragraphOtherDiagnosisSecondLine.add(new Chunk(" ", fontNormal));
                        paragraphOtherDiagnosisSecondLine.add(
                                new Chunk(otherDiagnosis.getDegree(), fontNormalUnderLine));
                        paragraphOtherDiagnosisSecondLine.add(
                                new Chunk(getBundleMessage("diagnosis.stage"), fontNormal));
                        paragraphOtherDiagnosisSecondLine.add(new Chunk(" ", fontNormal));
                        paragraphOtherDiagnosisSecondLine.add(
                                new Chunk(otherDiagnosis.getStage(), fontNormalUnderLine));
                        paragraphOtherDiagnosisSecondLine.add(
                                new Chunk(getBundleMessage("diagnosis.history"), fontNormal));
                        paragraphOtherDiagnosisSecondLine.add(new Chunk(" ", fontNormal));
                        paragraphOtherDiagnosisSecondLine.add(
                                new Chunk(otherDiagnosis.getHistory(), fontNormalUnderLine));

                        if (otherDiagnosis.getDetails() != null) {
                            document.add(paragraphOtherDiagnosisSecondLine);
                            Chunk otherDiagnosisDetailsChunk = new Chunk(otherDiagnosis.getDetails(), fontNormal);
                            otherDiagnosisDetailsChunk.setGenericTag("dashed");
                            Paragraph paragraphOtherDiagnosisThirdLine = new Paragraph(16, otherDiagnosisDetailsChunk);
                            if (i < otherDiagnosisList.size() - 1) {
                                paragraphOtherDiagnosisThirdLine.setSpacingAfter(8);
                            }
                            dashedLine.setActive(true);
                            document.add(paragraphOtherDiagnosisThirdLine);
                            dashedLine.setActive(false);
                        } else {
                            if (i < otherDiagnosisList.size() - 1) {
                                paragraphOtherDiagnosisSecondLine.setSpacingAfter(8);
                                document.add(paragraphOtherDiagnosisSecondLine);
                            }
                        }
                    }

                } else {
                    Paragraph paragraphOtherDiagnosisEmptyLabel = new Paragraph(12,
                            getBundleMessage("common.empty.text"), fontNormal);
                    paragraphOtherDiagnosisEmptyLabel.setSpacingBefore(4);
                    document.add(paragraphOtherDiagnosisEmptyLabel);
                }

                // Disability treatment reason
                Set<DisabilityType> disabilityTypes = disabilityReport.getDisabilityTypes();
                Paragraph paragraphDisabilityTypes = new Paragraph(13, getBundleMessage("disablity.types"), fontNormal);
                paragraphDisabilityTypes.setSpacingBefore(10);
                document.add(paragraphDisabilityTypes);

                PdfPTable disabilityTypesTable = new PdfPTable(new float[] { 4, 56, 4, 36 });
                disabilityTypesTable.setWidthPercentage(100);
                disabilityTypesTable.setSpacingBefore(8);

                PdfPCell cellDisabilityTypeImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellDisabilityTypeImg.addElement(disabilityTypes.contains(DisabilityType.WORKING_CAPACITY_LEVEL) ?
                        checkedImage :
                        uncheckedImage);
                disabilityTypesTable.addCell(cellDisabilityTypeImg);
                disabilityTypesTable.addCell(
                        getCell(getBundleMessage("disability.type.working.capacity.level"), fontNormal,
                                Element.ALIGN_LEFT, 12, Rectangle.NO_BORDER, 1, 3));

                cellDisabilityTypeImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellDisabilityTypeImg.addElement(
                        disabilityTypes.contains(DisabilityType.FIRST_TIME) ? checkedImage : uncheckedImage);
                disabilityTypesTable.addCell(cellDisabilityTypeImg);
                disabilityTypesTable.addCell(
                        getCell(getBundleMessage("disability.type.first.time"), fontNormal, Element.ALIGN_LEFT, 12,
                                Rectangle.NO_BORDER, 1, 3));

                cellDisabilityTypeImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellDisabilityTypeImg.addElement(
                        disabilityTypes.contains(DisabilityType.DISABILITY_LEVEL) ? checkedImage : uncheckedImage);
                disabilityTypesTable.addCell(cellDisabilityTypeImg);
                disabilityTypesTable.addCell(
                        getCell(getBundleMessage("disability.type.disability.level"), fontNormal, Element.ALIGN_LEFT,
                                12, Rectangle.NO_BORDER, 1, 3));

                cellDisabilityTypeImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellDisabilityTypeImg.addElement(
                        disabilityTypes.contains(DisabilityType.EXPIRED) ? checkedImage : uncheckedImage);
                disabilityTypesTable.addCell(cellDisabilityTypeImg);
                disabilityTypesTable.addCell(
                        getCell(getBundleMessage("disability.type.expired"), fontNormal, Element.ALIGN_LEFT, 12,
                                Rectangle.NO_BORDER, 1, 3));

                cellDisabilityTypeImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellDisabilityTypeImg.addElement(
                        disabilityTypes.contains(DisabilityType.SPECIAL_REQUIREMENT) ? checkedImage : uncheckedImage);
                disabilityTypesTable.addCell(cellDisabilityTypeImg);
                disabilityTypesTable.addCell(
                        getCell(getBundleMessage("disability.type.special.requirement"), fontNormal, Element.ALIGN_LEFT,
                                12, Rectangle.NO_BORDER, 1, 3));

                cellDisabilityTypeImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellDisabilityTypeImg.addElement(
                        disabilityTypes.contains(DisabilityType.HEALTH_COND_CHANGED) ? checkedImage : uncheckedImage);
                disabilityTypesTable.addCell(cellDisabilityTypeImg);
                disabilityTypesTable.addCell(
                        getCell(getBundleMessage("disability.type.condition.changed"), fontNormal, Element.ALIGN_LEFT,
                                12, Rectangle.NO_BORDER, 1, 3));

                cellDisabilityTypeImg = getPdfPCell(Rectangle.NO_BORDER, 1, 5);
                cellDisabilityTypeImg.addElement(
                        disabilityTypes.contains(DisabilityType.REQUIRED_BY_PERSON) ? checkedImage : uncheckedImage);
                disabilityTypesTable.addCell(cellDisabilityTypeImg);
                disabilityTypesTable.addCell(
                        getCell(getBundleMessage("disability.type.required.by.person"), fontNormal, Element.ALIGN_LEFT,
                                12, Rectangle.NO_BORDER, 3, 3));

                document.add(disabilityTypesTable);

                // Approving text
                Paragraph paragraphApprove = new Paragraph(13, getBundleMessage("approve.text"), fontNormal);
                paragraphApprove.setAlignment(Element.ALIGN_CENTER);
                paragraphApprove.setSpacingBefore(30);
                document.add(paragraphApprove);

                // Doctor signature
                PdfPTable signatureTable = new PdfPTable(new float[] { 4, 38, 2, 15, 2, 18, 2, 15, 4 });
                signatureTable.setWidthPercentage(100);
                signatureTable.setSpacingBefore(30);

                Doctor user = CommonHelper.valueOrDefault((Doctor) parameters.get(ReportConstants.PARAM_USER), null);
                signatureTable.addCell(getCell("", fontNormal, Element.ALIGN_CENTER, 12, Rectangle.NO_BORDER, 1, 3));
                signatureTable.addCell(
                        getCell(user.getFirstName() + " " + user.getLastName(), fontNormal, Element.ALIGN_CENTER, 12,
                                Rectangle.NO_BORDER, 1, 3));
                signatureTable.addCell(getCell("", fontNormal, Element.ALIGN_CENTER, 12, Rectangle.NO_BORDER, 1, 3));
                signatureTable.addCell(
                        getCell(user.getCode(), fontNormal, Element.ALIGN_CENTER, 12, Rectangle.NO_BORDER, 1, 3));
                signatureTable.addCell(getCell("", fontNormal, Element.ALIGN_CENTER, 12, Rectangle.NO_BORDER, 1, 3));
                signatureTable.addCell(
                        getCell(user.getOccupation(), fontNormal, Element.ALIGN_CENTER, 12, Rectangle.NO_BORDER, 1, 3));
                signatureTable.addCell(getCell("", fontNormal, Element.ALIGN_CENTER, 12, Rectangle.NO_BORDER, 1, 3));
                signatureTable.addCell(getCell("", fontNormal, Element.ALIGN_CENTER, 12, Rectangle.NO_BORDER, 1, 3));
                signatureTable.addCell(getCell("", fontNormal, Element.ALIGN_CENTER, 12, Rectangle.NO_BORDER, 1, 3));

                signatureTable.addCell(getCell("", fontSmall, Element.ALIGN_CENTER, 6, Rectangle.NO_BORDER, 1, 3));
                PdfPCell signatureCell = getCell(getBundleMessage("doctor.full.name"), fontSmall, Element.ALIGN_CENTER,
                        6, Rectangle.NO_BORDER, 1, 3);
                signatureCell.setCellEvent(new DottedCell(Rectangle.TOP));
                signatureTable.addCell(signatureCell);
                signatureTable.addCell(getCell("", fontSmall, Element.ALIGN_CENTER, 6, Rectangle.NO_BORDER, 1, 3));
                signatureCell = getCell(getBundleMessage("doctor.code"), fontSmall, Element.ALIGN_CENTER, 6,
                        Rectangle.NO_BORDER, 1, 3);
                signatureCell.setCellEvent(new DottedCell(Rectangle.TOP));
                signatureTable.addCell(signatureCell);
                signatureTable.addCell(getCell("", fontSmall, Element.ALIGN_CENTER, 6, Rectangle.NO_BORDER, 1, 3));
                signatureCell = getCell(getBundleMessage("doctor.occupation"), fontSmall, Element.ALIGN_CENTER, 6,
                        Rectangle.NO_BORDER, 1, 3);
                signatureCell.setCellEvent(new DottedCell(Rectangle.TOP));
                signatureTable.addCell(signatureCell);
                signatureTable.addCell(getCell("", fontSmall, Element.ALIGN_CENTER, 6, Rectangle.NO_BORDER, 1, 3));
                signatureCell = getCell(getBundleMessage("doctor.signature"), fontSmall, Element.ALIGN_CENTER, 6,
                        Rectangle.NO_BORDER, 1, 3);
                signatureCell.setCellEvent(new DottedCell(Rectangle.TOP));
                signatureTable.addCell(signatureCell);
                signatureTable.addCell(getCell("", fontSmall, Element.ALIGN_CENTER, 6, Rectangle.NO_BORDER, 1, 3));
                document.add(signatureTable);
                footerEvent.setPrint(true);
            } finally {
                document.close();
                if (writer != null) {
                    writer.close();
                }
            }
            return byteArrayOutputStream.toByteArray();
        }
    }

    public PdfPCell getCell(String content, Font font, int alignment, int leading, int border, int colspan,
            float padding) {

        Chunk c = new Chunk(content, font);

        Paragraph p = new Paragraph();
        p.setLeading(leading);
        p.setAlignment(alignment);
        p.add(c);

        PdfPCell pdfPCell = getPdfPCell(border, colspan, padding);
        pdfPCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        pdfPCell.addElement(p);
        return pdfPCell;
    }

    private PdfPCell getPdfPCell(int border, int colspan, float padding) {
        PdfPCell cell = new PdfPCell();
        cell.setBorder(border);
        cell.setPadding(padding);
        cell.setColspan(colspan);
        return cell;
    }

    public String getBundleMessage(String key, Object... args) {
        return bundle.getMessage(key, args, LocaleContextHolder.getLocale());
    }

    public String getMessageOrEmpty(String message) {
        return message == null ?
                bundle.getMessage("common.empty.text", new Object[] {}, LocaleContextHolder.getLocale()) :
                message;
    }

}
