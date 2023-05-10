import { Component, OnInit } from '@angular/core';
import { CaballosService } from './caballos.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';


@Component({
  selector: 'app-caballo',
  templateUrl: './caballo.component.html',
  styleUrls: ['./caballo.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CaballoComponent implements OnInit {

  constructor( 
    public caballosService: CaballosService,
    private confirmationService: ConfirmationService,
     private messageService: MessageService
    ) { }

  showDialog = false
  horses = []
  currentHorse = null
  ngOnInit(): void {
    this.getAllHorses();
  }

  getAllHorses(){
    this.caballosService.getAllHorses().subscribe(
      (response) => {
        this.horses = response
        console.log(response)
        
      },  (error ) => {
        console.error(error);  
        //this.errorMessage=true;
      }
   
    );
  }
  selectHorse(horse){
    this.currentHorse = horse;
    console.log(this.currentHorse)
    this.showDialog = true
  }

  deleteHorse(horseId){

this.caballosService.deleteHorse(horseId).subscribe(
  (response) => {
    if(response === true){
      this.getAllHorses();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Caballo eliminado correctamente' });
    }else {
      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error al intentar borrar el caballo' });
    }
   
    
    
  },  (error ) => {
    console.error(error);  
    //this.errorMessage=true;
  }

);
  }
  deleteHorseDialog(horseId) {
    //TODO meter un cargando
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteHorse(horseId)
            
        },
        reject: (type) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}

}
