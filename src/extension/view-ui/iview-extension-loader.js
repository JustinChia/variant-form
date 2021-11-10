import Vue from 'vue'

import { viewDesignFields } from '@/extension/view-ui/form-widget/widgetsConfig'
import viewDesignComponents from '@/extension/view-ui/form-widget/field-widget/'

import zh_CN from '@/extension/view-ui/lang/zh-CN_extension'
import en_US from '@/extension/view-ui/lang/en-US_extension'
import i18n from "@/utils/i18n";


export const viewDesignExtensions={
    install:function({
        addContainerWidgetSchema,
        addCustomWidgetSchema,
        registerFWGenerator,
        PERegister
      }){

        //注册字段配置
        viewDesignFields.forEach(field=>{
            addCustomWidgetSchema(field);
        })


        Object.keys(viewDesignComponents).map((key)=>{
            Vue.component(key,viewDesignComponents[key])
        })

        //注册i18n
        i18n.methods.addResource("zh-CN",zh_CN);
        i18n.methods.addResource("en-US",en_US);

        //注册SFC
        const sfcGenerators = require.context('./sfc-generator/', false, /\w+\.js$/);
        sfcGenerators.keys().map(fileName => {
            registerFWGenerator(fileName.substring(2,fileName.length-3),  sfcGenerators(fileName).templateGenerator)
        })
    }
}

