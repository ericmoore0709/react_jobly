import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /**
   * Gets a list of companies.
   * @returns a list of companies
   */
  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /**
   * Gets a list of jobs.
   * @returns a list of jobs
   */
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  /**
   * Gets a list of companies by query search
   * @param {*} queryParams an object with query parameters 
   * @returns a list of companies
   */
  static async getCompaniesByQuery(queryParams) {
    const queryString = new URLSearchParams(queryParams).toString();
    let res = await this.request(`companies?${queryString}`);
    return res.companies;
  }

  /**
   * Attempts to validate the user's credentials.
   * @param {*} data the user data to validate
   * @returns a valid token if user found
   */
  static async login(data) {
    let res = await this.request(`auth/token`, data, 'post');
    return res.token;
  }

  /**
   * Attempts to register the new user.
   * @param {*} data the user data to register
   * @returns a valid token if user created
   */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, 'post');
    return res.token;
  }

  /**
   * Attempts to get the user with the given username
   * @param {*} username the username to search
   * @returns the user if found
   */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /**
   * Attempts to update the current user profile
   * @param {string} username the user's username
   * @param {*} data the user data to update
   * @returns the updated user
   */
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, 'patch');
    return res.user;
  }

  static async applyToJob(jobId, username) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
    return res.applied;
  }

}

// // for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;