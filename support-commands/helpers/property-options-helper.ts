import {Step3PropertyContainer}   from '../../page-objects/home-page/step3-property-container'
import { PropertyOption } from '../types/step3-property-options'
import {  type Page } from "@playwright/test";


export const propertyOptionsHelper = async (page:Page,options?: PropertyOption | PropertyOption[],) => {

        //create variable for the page class
    const step3 = new Step3PropertyContainer(page)
      
   //scenario if no selections will be added on step 2
    if(!options){
        console.log('No Options Selected For STEP 3')
        await step3.submit()
        await step3.validateVariantsError("required")
        return;
    }

    const selections = Array.isArray(options) ? options : [options];
   
    //covered scenario for one or multiple options selected
    for (const option of selections){
        await step3.selectPropertyOption(option)
        console.log(`Option to select will be "${option}"`)
    }
   await step3.submit()
}