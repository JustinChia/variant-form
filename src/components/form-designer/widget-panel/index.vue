<template>
  <el-scrollbar class="side-scroll-bar" :style="{height: scrollerHeight}">
    <div class="panel-container">

      <el-collapse v-model="activeNames" class="widget-collapse">
        <el-collapse-item name="1" :title="i18nt('designer.containerTitle')">
          <draggable tag="ul" :list="containers" :group="{name: 'dragGroup', pull: 'clone', put: false}"
                     :clone="handleContainerWidgetClone" ghost-class="ghost" :sort="false"
                     :move="checkContainerMove" @end="onContainerDragEnd">
            <li v-for="(ctn, index) in containers" :key="index" class="container-widget-item" :title="ctn.displayName"
                @dblclick="addContainerByDbClick(ctn)">
              <span><svg-icon :icon-class="ctn.icon" />{{i18n2t(`designer.widgetLabel.${ctn.type}`, `extension.widgetLabel.${ctn.type}`)}}</span>
            </li>
          </draggable>
        </el-collapse-item>

        <el-collapse-item name="2" :title="i18nt('designer.basicFieldTitle')">
          <draggable tag="ul" :list="basicFields" :group="{name: 'dragGroup', pull: 'clone', put: false}"
                     :clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
            <li v-for="(fld, index) in basicFields" :key="index" class="field-widget-item" :title="fld.displayName"
                @dblclick="addFieldByDbClick(fld)">
              <span><svg-icon :icon-class="fld.icon" />{{i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`)}}</span>
            </li>
          </draggable>
        </el-collapse-item>

        <el-collapse-item name="3" :title="i18nt('designer.advancedFieldTitle')">
          <draggable tag="ul" :list="advancedFields" :group="{name: 'dragGroup', pull: 'clone', put: false}"
                     :clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
            <li v-for="(fld, index) in advancedFields" :key="index" class="field-widget-item" :title="fld.displayName"
                @dblclick="addFieldByDbClick(fld)">
              <span><svg-icon :icon-class="fld.icon" />{{i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`)}}</span>
            </li>
          </draggable>
        </el-collapse-item>

        <!-- -->
        <el-collapse-item name="4" :title="i18nt('designer.customFieldTitle')">
          <draggable tag="ul" :list="customFields" :group="{name: 'dragGroup', pull: 'clone', put: false}"
                     :clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
            <li v-for="(fld, index) in customFields" :key="index" class="field-widget-item" :title="fld.displayName"
                @dblclick="addFieldByDbClick(fld)">
              <span>
                <svg-icon :icon-class="fld.icon" />{{i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`)}}</span>
            </li>
          </draggable>
        </el-collapse-item>
        <!-- -->

      </el-collapse>

    </div>
  </el-scrollbar>
</template>

<script>
  import Draggable from 'vuedraggable'
  import {containers, basicFields, advancedFields, customFields} from "./widgetsConfig";
  import {addWindowResizeHandler} from "@/utils/util";
  import i18n from "@/utils/i18n";

  export default {
    name: "FieldPanel",
    mixins: [i18n],
    components: {
      Draggable,
    },
    props: {
      designer: Object,
    },
    data() {
      return {
        scrollerHeight: 0,

        activeNames: ['1', '2', '3', '4'],

        containers,
        basicFields,
        advancedFields,
        customFields,

        allContainers: [],
      }
    },
    computed: {
      //
    },
    mounted() {
      this.loadWidgets()

      this.scrollerHeight = window.innerHeight - 56 + 'px'
      addWindowResizeHandler(() => {
        this.$nextTick(() => {
          this.scrollerHeight = window.innerHeight - 56 + 'px'
          //console.log(this.scrollerHeight)
        })
      })
    },
    methods: {
      loadWidgets() {
        //this.allContainers = deepClone(this.containers)

        this.containers = this.containers.map(con => {
          return {
            ...con,
            displayName: this.i18n2t(`designer.widgetLabel.${con.type}`, `extension.widgetLabel.${con.type}`)
          }
        }).filter(con => {
          return !con.internal
        })

        this.basicFields = this.basicFields.map(fld => {
          return {
            ...fld,
            displayName: this.i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`)
          }
        })

        this.advancedFields = this.advancedFields.map(fld => {
          return {
            ...fld,
            displayName: this.i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`)
          }
        })

        this.customFields = this.customFields.map(fld => {
          return {
            ...fld,
            displayName: this.i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`)
          }
        })
      },

      handleContainerWidgetClone(origin) {
        return this.designer.copyNewContainerWidget(origin)
      },

      handleFieldWidgetClone(origin) {
        return this.designer.copyNewFieldWidget(origin)
      },

      checkContainerMove(evt) {
        return this.designer.checkWidgetMove(evt)
      },

      onContainerDragEnd(evt) {
        //console.log('Drag end of container: ')
        //console.log(evt)
      },

      addContainerByDbClick(container) {
        this.designer.addContainerByDbClick(container)
      },

      addFieldByDbClick(widget) {
        //console.log('addWidgetByDbClick')
        this.designer.addFieldByDbClick(widget)
      },

    }

  }
</script>

<style lang="scss" scoped>
  .side-scroll-bar {
    //height: calc(100% - 56px);
    //height: 100%;

    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  div.panel-container {
    //height: calc(100% - 48px);
    //height: 100%;
    //overflow-y: hidden;
    padding-bottom: 10px;
  }

  .el-collapse-item ::v-deep ul > li {
    list-style: none;
  }

  .widget-collapse {
    ::v-deep .el-collapse-item__header {
      margin-left: 8px;
      font-style: italic;
      font-weight: bold;
    }

    ::v-deep .el-collapse-item__content {
      padding-bottom: 6px;

      ul {
        padding-left: 10px;  /* 重置IE11默认样式 */
        margin: 0;  /* 重置IE11默认样式 */
        margin-block-start: 0;
        margin-block-end: 0.25em;
        padding-inline-start: 10px;

        &:after {
          content: "";
          display: block;
          clear: both;
        }

        .container-widget-item, .field-widget-item {
          display: inline-block;
          height: 28px;
          line-height: 28px;
          width: 115px;
          float: left;
          margin: 2px 6px 6px 0;
          cursor: move;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          background: #f1f2f3;
        }

        .container-widget-item:hover, .field-widget-item:hover {
          background: #EBEEF5;
          outline: 1px solid $--color-primary;
        }

        .drag-handler {
          position: absolute;
          top: 0;
          left: 160px;
          background-color: #dddddd;
          border-radius: 5px;
          padding-right: 5px;
          font-size: 11px;
          color: #666666;
        }
      }
    }
  }

</style>
