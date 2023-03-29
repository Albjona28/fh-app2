import './App.css';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from './chart/chart';
import GroupedBarChart from './chart/grouped-bar-chart';
import { LineChart } from './chart/line-chart';


function App() {
  const [data, setData] = useState([]);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const countries = [...new Set(data.map((item) => item.Country))];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_json/data/2b4874bb29c461a614e92773956ad573/fossil-fuel-co2-emissions-by-nation_json.json"
      );
      const jsonData = await response.json();
      setData(jsonData);
      const jsonDataWithId = jsonData.map(item => ({ ...item, id: uuidv4() }));
      setFilteredData(jsonDataWithId.slice(0, 100));
    };

    fetchData();
  }, []);

  const handleApplyFilters = () => {

    const dataWithId = data.map(item => ({ ...item, id: uuidv4() }));
    let filtered = dataWithId;

    if (startYear && endYear) {
      filtered = filtered.filter(
        (item) =>
          parseInt(item.Year) >= parseInt(startYear) &&
          parseInt(item.Year) <= parseInt(endYear)
      );
    } else if (startYear) {
      filtered = filtered.filter(
        (item) => parseInt(item.Year) >= parseInt(startYear)
      );
    } else if (endYear) {
      filtered = filtered.filter(
        (item) => parseInt(item.Year) <= parseInt(endYear)
      );
    }

    if (selectedCountry) {
      filtered = filtered.filter((item) => item.Country === selectedCountry);
    }

    setFilteredData(filtered);
  };

  return (
    <div>
      <div className="container-fluid row mx-2 my-3">
        <div className="col">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label htmlFor="start-year" className="input-group-text">Start Year:</label>
            </div>
            <input
              className="form-control"
              type="number"
              id="start-year"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label htmlFor="end-year" className="input-group-text">End Year:</label>
            </div>
            <input
              className="form-control"
              type="number"
              id="end-year"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <label htmlFor="country">Country:</label>
            <select
              className="form-select w-75"
              id="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="" className="dropdown-item">-- Select a Country --</option>
              {countries.map((country) => (
                <option key={country} value={country} className="dropdown-item">
                  {country}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleApplyFilters} className="btn btn-dark mb-3">Apply Filters</button>
        </div>
        <div className="col-md-8">
          {filteredData.length !== 0 && filteredData.length < 50 ?
            (<div><Chart data={filteredData} />
              <br />
            </div>) :
            (
              <p className="alert alert-danger mt-2">No Records or filter criteria includes too many results to process, please apply some filters!</p>
            )}
        </div>
      </div>
      <div className='row m-3'>
        {filteredData.length !== 0 && filteredData.length < 50 ? (
          <div>
            <GroupedBarChart data={filteredData} />
            <br />
            <LineChart data={filteredData} />
          </div>
        ) : (
          null
        )}
      </div>
    </div>
  );
}

export default App;