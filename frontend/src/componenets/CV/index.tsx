import ReactPDF, {
    Document,
    Page,
    PDFDownloadLink,
    PDFViewer,
    StyleSheet,
    Text,
    View,
    Link as PdfLink,
} from "@react-pdf/renderer";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Experience, Project } from "../../Interfaces/CvInterfaces";
import { CvModel } from "../../Interfaces/CvInterfaces";
import { isEditable } from "@testing-library/user-event/dist/utils";
interface CvProps {
    cv: CvModel;
    isEditable: boolean;
}

const Pdf = ({ cv }: CvProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    {/* Personal Details Section */}
                    <View style={styles.personalDetails}>
                        <Text style={styles.name}>
                            {cv.firstName + " " + cv.lastName}
                        </Text>
                        <Text style={styles.jobTitle}>{cv.job}</Text>
                        <Text style={styles.details}>
                            {cv.city}
                            {cv.country && ", "}
                            {cv.country}
                            {cv.email && " | "}
                            {cv.email && (
                                <PdfLink
                                    src={`mailto:${cv.email}`}
                                    style={styles.link}
                                >
                                    Email
                                </PdfLink>
                            )}
                        </Text>
                    </View>

                    {/* Objective Section */}
                    {cv.objective.trim() && (
                        <View style={[styles.section]}>
                            <Text style={[styles.title, styles.borderBottom]}>
                                Objective
                            </Text>
                            <Text style={styles.content}>{cv.objective}</Text>
                        </View>
                    )}

                    {/* Education Section */}
                    {cv.school.trim() && (
                        <View style={[styles.section]}>
                            <Text style={[styles.title, styles.borderBottom]}>
                                Education
                            </Text>
                            <View style={styles.educationDetails}>
                                <Text style={styles.schoolName}>
                                    {cv.school}
                                    {cv.city && ", "}
                                    {cv.schoolCity}
                                    {cv.schoolCountry && ", "}
                                    {cv.schoolCountry}
                                </Text>
                                <Text style={styles.schoolDate}>
                                    {cv.endSchoolDate
                                        ? `${cv.startSchoolDate.substring(
                                              0,
                                              7
                                          )} / ${cv.endSchoolDate.substring(
                                              0,
                                              7
                                          )}`
                                        : cv.startSchoolDate.substring(0, 7)}
                                </Text>
                            </View>
                            <Text style={styles.educationContent}>
                                Studied{" "}
                                <Text style={styles.bold}>
                                    {cv.schoolDepartment}
                                </Text>{" "}
                                at <Text style={styles.bold}>{cv.degree}</Text>
                            </Text>
                        </View>
                    )}

                    {/* Skills Section */}
                    {cv.skills.length !== 0 && (
                        <View style={[styles.section]}>
                            <Text style={[styles.title, styles.borderBottom]}>
                                Skills
                            </Text>
                            <Text style={styles.content}>
                                {cv.skills.join(" | ")}
                            </Text>
                        </View>
                    )}

                    {/* Projects Section */}
                    {cv.projects.length !== 0 && (
                        <View style={[styles.section]}>
                            <Text style={[styles.title, styles.borderBottom]}>
                                Projects
                            </Text>
                            {cv.projects.map((project, index) => (
                                <View key={index} style={styles.project}>
                                    <View style={styles.projectHeader}>
                                        <Text>{project.projectName}</Text>
                                        <Text>{project.projectDate}</Text>
                                    </View>
                                    <View style={styles.description}>
                                        {project.projectDetails
                                            .split("\n")
                                            .map((line, idx) => (
                                                <View
                                                    key={idx}
                                                    style={styles.activity}
                                                >
                                                    <Text>
                                                        • {line}
                                                        {"\n"}
                                                    </Text>
                                                </View>
                                            ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Extracurricular Activities Section */}
                    {cv.extraCurricularActivities.length !== 0 && (
                        <View style={[styles.section]}>
                            <Text style={[styles.title, styles.borderBottom]}>
                                Extracurricular Activities
                            </Text>
                            <View style={styles.content}>
                                {cv.extraCurricularActivities.map(
                                    (activity, index) => (
                                        <View
                                            key={index}
                                            style={styles.activity}
                                        >
                                            <Text>
                                                {activity}
                                                {"\n"}
                                            </Text>
                                        </View>
                                    )
                                )}
                            </View>
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: "15pt",
    },
    container: {
        width: "100%",
    },
    personalDetails: {
        textAlign: "center",
        marginBottom: 10,
    },
    name: {
        fontWeight: "bold",
        fontSize: "20pt",
    },
    jobTitle: {
        fontWeight: "bold",
        fontSize: "15pt",
        marginTop: 5,
    },
    details: {
        fontSize: "11pt",
        marginTop: 5,
    },
    link: {
        color: "blue",
        textDecoration: "none",
    },
    section: {
        marginTop: 10,
        marginBottom: 10,
        borderBottom: "  1px",
    },
    title: {
        fontSize: "13pt",
        fontWeight: "bold",
        color: "#055160",
        marginBottom: 3,
    },
    content: {
        fontSize: "9pt",
        marginTop: 5,
    },
    educationDetails: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    schoolName: {
        textAlign: "center",
        textDecoration: "underline",
        fontSize: "10pt",
        fontWeight: "bold",
    },
    schoolDate: {
        fontSize: "9pt",
    },
    educationContent: {
        fontSize: "9pt",
    },
    bold: {
        fontWeight: "bold",
    },
    project: {
        marginBottom: 10,
    },
    projectHeader: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        fontWeight: "bold",
        fontSize: "10pt",
        color: "#183ccc",
    },
    description: {
        fontSize: "9pt",
        marginTop: 5,
    },
    activity: {
        marginBottom: 3,
    },
    borderBottom: {
        borderBottomWidth: 1, // Width of the border
        borderBottomColor: "#ececec", // Color of the border
        borderBottomStyle: "solid", // Style of the border (solid, dashed, etc.)
    },
});

const Cv = ({ cv }: CvProps) => {
    return (
        <>
            <div className="container bg-light">
                <div className="row">
                    <div className="col-12">
                        <div className="personalDetails text-center mt-1 text-black">
                            <div
                                className="name fw-bold "
                                style={{ fontSize: "80%" }}
                            >
                                {cv.firstName + " " + cv.lastName}
                            </div>
                            <div
                                className="jobTitle fw-bold"
                                style={{ fontSize: "60%" }}
                            >
                                {cv.job}
                            </div>
                            <div
                                className="details "
                                style={{ fontSize: "50%" }}
                            >
                                {cv.city}
                                {cv.country && ","}
                                {cv.country}
                                {cv.email && " | "}
                                {cv.email && (
                                    <Link to={`mailto: ${cv.email}`}>
                                        Email
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {cv.objective.trim() && (
                        <div className="col-12">
                            <div className="objective">
                                <div
                                    className="title text-info-emphasis fw-bold"
                                    style={{ fontSize: "55%" }}
                                >
                                    Objective
                                </div>
                                <p
                                    className="content m-0 mb-1 text-break text-black"
                                    style={{ fontSize: "45%" }}
                                >
                                    {cv.objective}
                                </p>
                            </div>
                        </div>
                    )}

                    {cv.school.trim() && (
                        <div className="col-12">
                            <div className="education">
                                <div
                                    className="title text-info-emphasis fw-bold"
                                    style={{ fontSize: "55%" }}
                                >
                                    Education
                                </div>
                                <div
                                    className="content text-center fw-bold text-black"
                                    style={{ fontSize: "45%" }}
                                >
                                    <div className="schoolDetails d-flex justify-content-between ">
                                        <span className="schoolName text-decoration-underline">
                                            {cv.city
                                                ? `${cv.school}, `
                                                : cv.school}
                                            {cv?.schoolCountry
                                                ? `${cv.schoolCity}, `
                                                : cv.schoolCity}
                                            {cv.schoolCountry}{" "}
                                        </span>
                                        <span className="schoolDate">
                                            {cv.endSchoolDate
                                                ? `${cv.startSchoolDate.substring(
                                                      0,
                                                      7
                                                  )}/${cv.endSchoolDate.substring(
                                                      0,
                                                      7
                                                  )}`
                                                : cv.startSchoolDate.substring(
                                                      0,
                                                      7
                                                  )}
                                        </span>
                                    </div>
                                </div>
                                <p
                                    style={{ fontSize: "45%" }}
                                    className="m-0 mb-1 text-black"
                                >
                                    Studied{" "}
                                    <span className="fw-bold">
                                        {cv.schoolDepartment}
                                    </span>{" "}
                                    at{" "}
                                    <span className="fw-bold">{cv.degree}</span>
                                </p>
                            </div>
                        </div>
                    )}

                    {cv?.skills?.length !== 0 ? (
                        <div className="col-12">
                            <div className="skills mb-1">
                                <div
                                    className="title text-info-emphasis fw-bold"
                                    style={{ fontSize: "55%" }}
                                >
                                    Skills
                                </div>
                                <p
                                    className="content d-flex m-0 text-black"
                                    style={{ fontSize: "45%" }}
                                >
                                    {cv.skills.join(" | ")}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>loading..</div>
                    )}

                    {cv?.projects?.length !== 0 ? (
                        <div className="col-12">
                            <div className="projects">
                                <div
                                    className="title text-info-emphasis fw-bold "
                                    style={{ fontSize: "55%" }}
                                >
                                    Projects
                                </div>

                                {cv.projects.map((project) => (
                                    <div
                                        className="project mb-1"
                                        style={{ fontSize: "50%" }}
                                    >
                                        <div
                                            className="title  d-flex justify-content-between fw-medium "
                                            style={{ color: "#183ccc" }}
                                        >
                                            <div className="name ">
                                                {project.projectName}
                                            </div>
                                            <div className="date">
                                                {project.projectDate}
                                            </div>
                                        </div>

                                        <div className="description text-break text-black">
                                            {project.projectDetails
                                                .split("\n")
                                                .map((line, index) => (
                                                    <span key={index}>
                                                        {`• ` + line}
                                                        <br />
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>loading</div>
                    )}

                    {cv?.extraCurricularActivities?.length !== 0 ? (
                        <div className="col-12">
                            <div className="activities mb-1">
                                <div
                                    className="title text-info-emphasis fw-bold"
                                    style={{ fontSize: "55%" }}
                                >
                                    Extracurricular Activities
                                </div>
                                <div
                                    className="content m-0"
                                    style={{ fontSize: "45%" }}
                                >
                                    {cv?.extraCurricularActivities?.map(
                                        (activity, index) => (
                                            <span
                                                key={index}
                                                className="text-black"
                                            >
                                                {activity}
                                                <br />
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>loading...</div>
                    )}
                </div>
                {!isEditable && (
                    <PDFDownloadLink
                        document={<Pdf cv={cv} isEditable={false} />}
                        fileName={`a_CV.pdf`}
                        className="position-absolute  start-50 translate-middle-x"
                        style={{ bottom: "-50px" }}
                    >
                        <button className="btn btn-success">Download</button>
                    </PDFDownloadLink>
                )}
            </div>
        </>
    );
};

export default Cv;
