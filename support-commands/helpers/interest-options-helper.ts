import {Step2InterestContainer}   from '../../page-objects/home-page/step2-interest-container'
import { InterestOption } from '../types/step2-interest-options'
import { Page } from "@playwright/test";


export const interestOptionsHelper = async (page:Page,options?: InterestOption | InterestOption[]) => {

        //create variable for the page class
    const step2 = new Step2InterestContainer(page)
      
   //scenario if no selections will be added on step 2
    if(!options){
        console.log('No Options Selected For STEP 2')
         await step2.submit()
        return;
    }

    const selections = Array.isArray(options) ? options : [options];
    //covered scenario for one or multiple options selected
    for (const option of selections){
        await step2.selectInterestOption(option)
        console.log(`Option to select will be "${option}"`)
       
    }
     await step2.submit()

}