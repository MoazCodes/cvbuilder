import React, { useState, useEffect } from "react";
import "./style.css";

const Jobs = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [jobsPerPage, setJobsPerPage] = useState(3); // Default to 3 rows per page
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const adjustJobsPerPage = () => {
            const rowHeight = 150;
            const availableHeight = window.innerHeight - 300;
            const rows = Math.floor(availableHeight / rowHeight);
            setJobsPerPage(rows);
        };

        adjustJobsPerPage();
        window.addEventListener("resize", adjustJobsPerPage);

        return () => {
            window.removeEventListener("resize", adjustJobsPerPage);
        };
    }, [windowHeight]);

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = currentPage * jobsPerPage;
    const paginatedJobs = filteredJobs.slice(
        startIndex,
        startIndex + jobsPerPage
    );

    const handleNext = () => {
        if (startIndex + jobsPerPage < filteredJobs.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            {/* Search Form */}
            <div className="h-80p"> </div>
            <section className="search-section py-4">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-8 col-sm-12">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Desired job position"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-md-2 col-sm-12">
                            <button className="btn btn-primary w-100">
                                <i className="fas fa-search"></i> Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job List */}
            <section className="job-listing py-4">
                <div className="container">
                    <div className="row">
                        {paginatedJobs.length > 0 ? (
                            paginatedJobs.map((job, index) => (
                                <div className="col-12 mb-3" key={index}>
                                    <div className="card w-100 bg-transparent border text-light">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <h5 className="card-title">
                                                    {job.title}
                                                </h5>
                                                <button className="btn btn-link">
                                                    <i className="far fa-star"></i>
                                                </button>
                                            </div>
                                            <p className="card-text">
                                                {job.description}
                                            </p>
                                            <p className="card-text">
                                                {job.location} | {job.type} |{" "}
                                                {job.postedDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No jobs match your search.</p>
                        )}
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={handlePrev}
                            disabled={currentPage === 0}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={handleNext}
                            disabled={
                                startIndex + jobsPerPage >= filteredJobs.length
                            }
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

// Sample job data
const jobs = [
    {
        title: "Sales Associate (In-store)",
        description: "Experience in customer service and sales...",
        location: "Cairo",
        type: "Full-time",
        postedDate: "a day ago",
    },
    {
        title: "Logistics Specialist",
        description: "Responsible for overseeing shipments and inventory...",
        location: "New Cairo",
        type: "Full-time",
        postedDate: "2 days ago",
    },
    {
        title: "Software Engineer",
        description: "Develop and maintain web applications...",
        location: "Giza",
        type: "Full-time",
        postedDate: "3 days ago",
    },
    {
        title: "Product Manager",
        description: "Lead product strategy and development...",
        location: "Alexandria",
        type: "Full-time",
        postedDate: "4 days ago",
    },
    {
        title: "Graphic Designer",
        description: "Create visual content for online and print media...",
        location: "Cairo",
        type: "Part-time",
        postedDate: "5 days ago",
    },
    {
        title: "Marketing Coordinator",
        description: "Manage marketing campaigns and social media...",
        location: "Giza",
        type: "Full-time",
        postedDate: "6 days ago",
    },
    {
        title: "Data Analyst",
        description: "Analyze large datasets to inform business decisions...",
        location: "New Cairo",
        type: "Full-time",
        postedDate: "a week ago",
    },
    {
        title: "HR Specialist",
        description:
            "Handle recruitment, onboarding, and employee relations...",
        location: "Alexandria",
        type: "Full-time",
        postedDate: "8 days ago",
    },
    {
        title: "Project Manager",
        description: "Oversee and manage project lifecycle and timelines...",
        location: "Cairo",
        type: "Full-time",
        postedDate: "10 days ago",
    },
    {
        title: "IT Support Technician",
        description: "Provide technical support and troubleshoot issues...",
        location: "Giza",
        type: "Full-time",
        postedDate: "11 days ago",
    },
];

export default Jobs;
