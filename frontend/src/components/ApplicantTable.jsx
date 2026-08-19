import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import sampleApplicants from "../data/sampleApplicants";
import "./ApplicantTable.css";

const STATUS_CLASS = {
  Approved: "status-pill status-pill--approved",
  Rejected: "status-pill status-pill--rejected",
  "Connection Released": "status-pill status-pill--released",
};

export default function ApplicantTable() {
  const [applicants, setApplicants] = useState(sampleApplicants);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");
  const [usingSampleData, setUsingSampleData] = useState(true);

  // Try the real API first; silently keep the sample rows if it's not
  // reachable yet (backend endpoint added in a later step).
  useEffect(() => {
    let cancelled = false;
    api
      .get("/applicants/")
      .then((res) => {
        if (!cancelled && Array.isArray(res.data?.results ?? res.data)) {
          setApplicants(res.data.results ?? res.data);
          setUsingSampleData(false);
        }
      })
      .catch(() => {
        // API not available yet — keep sample data.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return applicants.filter((a) => {
      if (fromDate && a.date_of_application < fromDate) return false;
      if (toDate && a.date_of_application > toDate) return false;
      if (search && !String(a.id).includes(search.trim())) return false;
      return true;
    });
  }, [applicants, fromDate, toDate, search]);

  return (
    <section className="applicant-panel">
      <h1 className="applicant-panel__title">Applicant Details</h1>

      <div className="filter-bar">
        <div className="filter-bar__dates">
          <span className="filter-bar__label">Filter By Date of Application</span>
          <div className="filter-bar__date-inputs">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="filter-input"
              aria-label="From Date"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="filter-input"
              aria-label="To Date"
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="Search By Applicant ID.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input filter-input--search"
        />
      </div>

      {usingSampleData && (
        <p className="applicant-panel__note">
          Showing sample data — connect the backend to see live records.
        </p>
      )}

      <div className="applicant-table__scroll">
        <table className="applicant-table">
          <thead>
            <tr>
              <th>Applicant ID</th>
              <th>Type</th>
              <th>ID Proof</th>
              <th>ID Number</th>
              <th>Category</th>
              <th>Units</th>
              <th>Date</th>
              <th>Status</th>
              <th>Sanctioned Load</th>
              <th>Engineer</th>
              <th>Remarks</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.applicant_type}</td>
                <td>{a.id_proof_type}</td>
                <td>{a.id_proof_number}</td>
                <td>{a.category}</td>
                <td>{a.units}</td>
                <td>{a.date_of_application}</td>
                <td>
                  <span className={STATUS_CLASS[a.status] ?? "status-pill"}>
                    {a.status}
                  </span>
                </td>
                <td>{a.sanctioned_load}</td>
                <td>{a.engineer_name}</td>
                <td>{a.remarks}</td>
                <td>
                  <button className="edit-btn" type="button">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={12} className="applicant-table__empty">
                  No applicants match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
