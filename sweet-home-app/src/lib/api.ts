import { API_BASE_URL } from '../../environment';
import { toast } from '../hooks/use-toast';
import { Apartment } from '../types/Apartment';
import { ApartmentsResponse } from '../types/ApartmentsResponse';

export const fetchApartments = async (
    page: number = 1,
    limit: number = 6,
    searchQuery: string = '',
    searchType: string = 'name'
  ): Promise<ApartmentsResponse> => {
    let url = `${API_BASE_URL}/api/apartments?page=${page}&limit=${limit}`;
  
    if (searchQuery) {
        url += `&searchQuery=${encodeURIComponent(searchQuery)}&searchType=${searchType}`;
    }
  
    const response = await fetch(url);
  
    if(response.status === 404) {
        toast({
            title: "No apartments found.",
            duration: 3000,
            });
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    } else if (!response.ok) {
        toast({
            title: "Failed to fetch apartments.",
            description: "Please try again later.",
            duration: 3000,
        });
    throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  
    return response.json();
};

export const fetchApartment = async (id: string): Promise<Apartment> => {
    const response = await fetch(`${API_BASE_URL}/api/apartments/` + id);
    if (!response.ok) {
        toast({
            title: "Failed to fetch apartment with ID: ${id}.",
            description: " Please try again later.",
            duration: 3000,
          });
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
};

export const addApartment = async (apartment: Partial<Apartment>): Promise<Apartment> => {
    const response = await fetch(`${API_BASE_URL}/api/apartments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(apartment),
    });
    if (!response.ok) {
        toast({
            title: "Failed to add apartment.",
            description: " Please try again later.",
            duration: 3000,
          });
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
};

