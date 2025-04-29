import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Adjust this if your backend is on a different port or host

interface LoginCredentials {
  username: string;
  password: string;
}

interface LinkData {
  deep_link: string;
  fallback_url: string;
  custom_alias?: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
}

interface LinkResponse {
  id: number;
  shortcode: string;
  deep_link: string;
  fallback_url: string;
}

export const login = async (credentials: LoginCredentials): Promise<TokenResponse> => {
  const response = await axios.post(`${API_URL}/token`, credentials, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return response.data;
};

export const createLink = async (linkData: LinkData, token: string): Promise<LinkResponse> => {
  const response = await axios.post(`${API_URL}/links`, linkData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getLink = async (shortcode: string): Promise<LinkResponse> => {
  const response = await axios.get(`${API_URL}/${shortcode}`);
  return response.data;
};
