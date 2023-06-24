import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export class HttpClient {
  private axiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        url,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        url,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      // La petición fue realizada y el servidor respondió con un código de error
      const status = error.response.status;
      const message =
        error.response.data.message || "Ha ocurrido un error en la petición";
      return new Error(`Error ${status}: ${message}`);
    } else if (error.request) {
      // La petición fue realizada pero no se recibió ninguna respuesta
      return new Error("No se recibió respuesta del servidor");
    } else {
      // Ocurrió un error al configurar la petición
      return new Error("Error al realizar la petición");
    }
  }
}

// Ejemplo de uso
