import axios from 'axios';

export async function getCompaniesFromAPI() {
  try {
    const res = await axios.get('https://fakerapi.it/api/v1/companies');
    const { data } = res;
    return data.data;
  } catch (err) {
    return console.error(err);
  }
}
