import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ServicioFormularioService {
  constructor(public http: HttpClient) {}

  public postData(prospecto): Observable<any> {
    return this.http.post(
      "https://intense-reef-75653.herokuapp.com/prospecto",
      prospecto
    );
  }

  public getData(): Observable<any> {
    return this.http.get(
      "https://intense-reef-75653.herokuapp.com/prospecto"
    );
  }

  public getDataId(id): Observable<any> {
    return this.http.get(
      "https://intense-reef-75653.herokuapp.com/prospecto/" + id
    );
  }

  public putData(id,prospecto): Observable<any> {
    return this.http.put(
      "https://intense-reef-75653.herokuapp.com/prospecto/" + id,
      prospecto
    );
  }

  public deleteData(id): Observable<any> {
    return this.http.delete(
      "https://intense-reef-75653.herokuapp.com/prospecto/" + id,
    )
  }


}
