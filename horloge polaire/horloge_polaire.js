/********************************************************************************
 *   Copyright (C) 2012 HERPE Grégory gregory.herpe@gmail.com                  *
 *                                                                              *
 * This program is free software; you can redistribute it and/or                *
 * modify it under the terms of the GNU Lesser General Public                   *
 * License as published by the Free Software Foundation; either                 *
 * version 2.1 of the License, or (at your option) any later version.           *
 *                                                                              *
 * This program is distributed in the hope that it will be useful,              *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of               *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU             *
 * Lesser General Public License for more details.                              *
 *                                                                              *
 * You should have received a copy of the GNU Lesser General Public             *
 * License along with this program; if not, write to the Free Software          *
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA *
 *                                                                              *
 ********************************************************************************/

    
function Horloge(context, width, height){
    instance = this;
    this.context = context;
    this.duree = 100;
    this.width = width;
    this.height = height;
    this.horlogeTaille = this.width;
    if (this.width>this.height){
        this.horlogeTaille = this.height;
    }
    this.date = new Date();
    this.afficheHorloge();
                
                
}
Horloge.prototype = {
    initialise : function(){
        instance.context.fillStyle = "#FFFFEE";
        instance.context.fillRect(0, 0, this.width, this.height);
        //               instance.date = new Date(2011, 1, 20, 10, 59, 59, 0);
        instance.date = new Date();
    },
    afficheCercle : function(debut, fin, rayon, couleur, epaisseur){
        instance.context.beginPath();
        instance.context.arc(instance.width/2, instance.height/2,
            rayon, (Math.PI/180)*(debut - 90), (Math.PI/180)*(fin - 90) , false);
        instance.context.lineCap = "round";
        instance.context.lineWidth = epaisseur;
        instance.context.strokeStyle = couleur;
        instance.context.stroke();
        instance.context.closePath();
    },
    afficheSeconde : function(){
        this.afficheCercle(0, 
            instance.date.getSeconds()*360/60+instance.date.getMilliseconds()*360/60000,
            instance.horlogeTaille/2.2, "lightblue", instance.horlogeTaille/110);
                    
    },
    afficheMinute : function(){
        this.afficheCercle(0, 
            instance.date.getMinutes()*360/60+instance.date.getSeconds()*360/3600,
            instance.horlogeTaille/2.4, "lightgreen", instance.horlogeTaille/44);
                    
    },
    afficheHeure : function(){
        this.afficheCercle(0, 
            instance.date.getHours()*360/24+instance.date.getMinutes()*360/3600, 
            instance.horlogeTaille/2.75, "lightgray", instance.horlogeTaille/31);
                    
    },
    afficheJour : function(){
        //getMonth() va de 0 à 11
        var nbJour = 31;
        //mois de 30 jours
        if (instance.date.getMonth()==3 ||
            instance.date.getMonth()==5 ||
            instance.date.getMonth()==8 ||
            instance.date.getMonth()==10 ) {
            nbJour = 30;
        }
        //février
        //new Date(2012,2,0).getDate()==29 
        if (instance.date.getMonth()==1) {
            nbJour = new Date(instance.date.getFullYear(), 2, 0).getDate();
        }
        
        this.afficheCercle(0, 
            instance.date.getDate()*360/nbJour+instance.date.getHours()*360/744,
            instance.horlogeTaille/4.9, "lightblue", instance.horlogeTaille/25);
                    
    },
    afficheMois : function(){
        this.afficheCercle(0, 
            instance.date.getMonth()*360/12+instance.date.getDate()*360/372,
            instance.horlogeTaille/7, "pink", instance.horlogeTaille/20);
                    
    },
    afficheHorloge : function(){
        instance.initialise();
        instance.afficheSeconde();
        instance.afficheMinute();
        instance.afficheHeure();
        instance.afficheJour();
        instance.afficheMois();
        window.setTimeout("window.Horloge.prototype.afficheHorloge()",instance.duree);
                    
    }
}
;
            
window.onload = function(){
    var canvas = document.getElementById("horloge");
    var context = canvas.getContext("2d");
    new Horloge(context,canvas.width, canvas.height);
};
            
            