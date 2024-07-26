<template>
  <div>
    <div id="bpmnViewer" style="height: 100vh; width: 100%;" />
    <button @click="saveDiagram">保存流程图</button>
    <button @click="loadDiagram">加载流程图</button>
  </div>
</template>

<script>
import BpmnJS from 'bpmn-js'
import saveAs from 'file-saver' // 需要先安装file-saver库

export default {
  name: 'BpmnEditorComponent',
  data() {
    return {
      bpmnViewer: null
    }
  },
  mounted() {
    this.initBpmnViewer()
  },
  beforeDestroy() {
    // 组件销毁前清理BpmnJS实例（如果需要）
    if (this.bpmnViewer) {
      this.bpmnViewer.destroy()
    }
  },
  methods: {
    async initBpmnViewer() {
      this.bpmnViewer = new BpmnJS({
        container: '#bpmnViewer',
        additionalModules: [] // 可在此处添加自定义模块
      })
      const initialXml = `
          <?xml version="1.0" encoding="UTF-8"?>
          <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" id="SampleProcess_1">
            <bpmn:process id="Process_1" isExecutable="true">
              <bpmn:startEvent id="StartEvent_1"/>
              <bpmn:endEvent id="EndEvent_1"/>
              <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="EndEvent_1"/>
            </bpmn:process>
          </bpmn:definitions>
        `
      try {
        // 初始化加载一个简单的BPMN示例（可选）
        console.log('Attempting to import:', initialXml)
        await this.bpmnViewer.importXML(initialXml)
      } catch (error) {
        console.error('Error initializing diagram with error detail:', error)
        console.error('Failed XML:', initialXml) // 显示导致失败的XML内容
      }
    },

    async saveDiagram() {
      try {
        const { xml } = await this.bpmnViewer.saveXML({ format: true })
        const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' })
        saveAs(blob, 'diagram.bpmn')
      } catch (error) {
        console.error('Error saving diagram', error)
      }
    },

    async loadDiagram() {
      // 这里应实现从用户输入或特定来源加载BPMN XML的逻辑
      // 示例中省略了实际读取文件或API调用的过程
      const bpmnXml = ` <?xml version="1.0" encoding="UTF-8"?>
          <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" id="SampleProcess_1">
            <bpmn:process id="Process_1" isExecutable="true">
              <bpmn:startEvent id="StartEvent_1"/>
              <bpmn:endEvent id="EndEvent_1"/>
              <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="EndEvent_1"/>
            </bpmn:process>
          </bpmn:definitions>` // 假设这是从某个来源获取的XML字符串
      if (bpmnXml) {
        try {
          await this.bpmnViewer.importXML(bpmnXml)
        } catch (error) {
          console.error('Error loading diagram', error)
        }
      } else {
        console.warn('No BPMN XML provided for loading.')
      }
    }
  }
}
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>
