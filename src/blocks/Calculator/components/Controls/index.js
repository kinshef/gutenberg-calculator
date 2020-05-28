const { __ } = wp.i18n
const { InspectorControls, MediaUpload } = wp.blockEditor
const {useState, useEffect} = wp.element
const {PanelBody, PanelRow, TextControl, Button, CheckboxControl, SelectControl, RadioControl} = wp.components


const Controls = ({ attributes, setAttributes, className }) => {

  const [localState, setLocalState] = useState(
    {'newSection': (()=>{
      let asd = {}
      Object.keys(attributes.dataItems).map(productName => {
        asd = {...asd, [productName]: {
          'nameSection': '',
          'nemeOneParametersSection': '',
          'editSection': (()=>{
            var asd = {}
            for(let i=0; i<attributes.dataItems[productName].formParameters.sequence.length; i++){
              asd = {...asd, [attributes.dataItems[productName].formParameters.sequence[i]]: ''}
            }
            return asd
          })()
        }}
      })
      return asd
    })(),
    'newProduct': ''}
  )

  useEffect(() => {
    setLocalState({...localState, 'newProduct': ''})
  }, [attributes.dataItems]);


  let buildSectionProducts = Object.keys(attributes.dataItems).map(productName => {
    return <PanelBody title={productName} initialOpen={false}>
        {attributes.dataItems[productName].formParameters.sequence.map((e, index) => {
          return <PanelBody title={e} initialOpen={false}>
            <PanelRow>
              <TextControl
                label='Title parameters'
                type="text"
                value={attributes.dataItems[productName].formParameters.formTitle[e]}
                onChange={text =>{
                  setAttributes({
                    ...attributes, 'dataItems': {
                      ...attributes.dataItems, [productName]: {
                        ...attributes.dataItems[productName], 'formParameters': {
                          ...attributes.dataItems[productName].formParameters, 'formTitle': {
                            ...attributes.dataItems[productName].formParameters.formTitle, [e]: text
                          }
                        }
                      }
                    }
                  })
                }}
              />
            </PanelRow>
            <PanelBody title={'new value'} initialOpen={false}>
              <TextControl
                label='name new value'
                type="text"
                value={localState.newSection[productName].editSection[e]}
                onChange={text => {
                  setLocalState({...localState, 'newSection': {
                    ...localState.newSection, [productName]: {
                      ...localState.newSection[productName], 'editSection': {
                        ...localState.newSection[productName].editSection,
                        [e]: text
                      }
                    }
                  }})
                }}
              />
              <Button 
                isPrimary
                onClick={() => {
                  let activeIteration = 0;
                  let mainObject = {...attributes.dataItems[productName].form}
                  let coversArr = (mainObject, activeIteration, fullMainObject) => {
                      if(activeIteration === index){
                        if(Object.keys(mainObject[Object.keys(mainObject)[0]]).length){
                          for(let i=0; i<Object.keys(mainObject[Object.keys(mainObject)[0]]).length; i++){
                            mainObject[localState.newSection[productName].editSection[e]] = {
                              ...mainObject[localState.newSection[productName].editSection[e]],
                              [Object.keys(mainObject[Object.keys(mainObject)[0]])[i]]: 1
                            }
                          }
                        }else{
                          mainObject[localState.newSection[productName].editSection[e]] = 1;
                        }
                        setAttributes({
                          ...attributes, 'dataItems': {
                            ...attributes.dataItems, [productName]: {
                              ...attributes.dataItems[productName], 'form': {
                                ...fullMainObject
                              }
                            }
                          }
                        })
                        setLocalState({ 
                          ...localState, 'newSection': {
                            ...localState.newSection, [productName]: {
                              'editSection': {
                                ...localState.newSection[productName].editSection,
                                [e]: ''
                              },
                              'nameSection': '',
                              'nemeOneParametersSection': '',
                            }
                          }
                        })
                      }else{
                        return Object.keys(mainObject).map( key => {
                          if(typeof(mainObject[key]) === "object"){
                            let toFalseIteration = activeIteration;
                            ++toFalseIteration;
                            mainObject[key] = {...mainObject[key]}
                            return coversArr(mainObject[key], toFalseIteration, fullMainObject)
                          }
                        })
                      }
                  }
                  return coversArr(mainObject, activeIteration, mainObject)
                }}>add</Button>
            </PanelBody>
          </PanelBody>
        })}

        <PanelBody title={'Value'} initialOpen={false}>
          {(() => {
            let activeIteration = 0;
            let mainObject = {...attributes.dataItems[productName].form}
            let coversArr = (mainObject, activeIteration, fullMainObject) => {
              return Object.keys(mainObject).map( key => {
                if(activeIteration === attributes.dataItems[productName].formParameters.sequence.length - 1){
                  if(typeof(mainObject[key]) !== "object"){
                    return <PanelBody title={key} initialOpen={false}>
                      <TextControl
                        label='value'
                        type="number"
                        value={mainObject[key]}
                        onChange={text => {
                          mainObject[key] = +text;
                          setAttributes({
                            ...attributes, 'dataItems': {
                              ...attributes.dataItems, [productName]: {
                                ...attributes.dataItems[productName], 'form': {
                                  ...fullMainObject
                                }
                              }
                            }
                          })
                        }}
                      />
                    </PanelBody>
                  }
                }else{
                  if(typeof(mainObject[key]) === "object"){
                    let toFalseIteration = activeIteration;
                    ++toFalseIteration;
                    mainObject[key] = {...mainObject[key]}
                    return <PanelBody title={key} initialOpen={false}>
                      {coversArr(mainObject[key], toFalseIteration, mainObject)}
                    </PanelBody>
                  }
                }
              })
            }
            return coversArr(mainObject, activeIteration, mainObject)
          })()}
        </PanelBody>

      <PanelBody title={'new section'} initialOpen={false}>
        <PanelRow>
          <TextControl
            label='new section'
            type="text"
            value={localState.newSection[productName].nameSection}
            onChange={text => {
              setLocalState({...localState, 'newSection': {
                ...localState.newSection, [productName]: {
                  ...localState.newSection[productName], 'nameSection': text
                }
              }})
            }}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label='neme One Parameters Section'
            type="text"
            value={localState.newSection[productName].nemeOneParametersSection}
            onChange={text => {
              setLocalState({...localState, 'newSection': {
                ...localState.newSection, [productName]: {
                  ...localState.newSection[productName], 'nemeOneParametersSection': text
                }
              }})
            }}
          />
        </PanelRow>
        <PanelRow>
          <Button 
            isPrimary
            onClick={() => {
              setAttributes({
                ...attributes, 'dataItems': {
                  ...attributes.dataItems, [productName]: {
                    ...attributes.dataItems[productName],
                    'form': (() => {
                      let nemeParameters = localState.newSection[productName].nemeOneParametersSection
                      let mainObject = {...attributes.dataItems[productName].form}
                      if(Object.keys(mainObject).length > 0){
                        let coversArr = (mainObject, nemeParameters) => {
                          for(let key in mainObject){
                            if(typeof(mainObject[key]) === "object"){
                              mainObject[key] = {...mainObject[key]}
                              coversArr(mainObject[key], nemeParameters)
                            }else {
                              mainObject[key] = {...mainObject[key], [nemeParameters]: mainObject[key]}
                            }
                          }
                        }
                        coversArr(mainObject, nemeParameters)
                      }else {
                        mainObject = {
                          [nemeParameters]: 1
                        }
                      }
                      return mainObject
                    })(),
                    'formParameters': {
                      ...attributes.dataItems[productName].formParameters,
                      'formTitle': {
                        ...attributes.dataItems[productName].formParameters.formTitle,
                        [localState.newSection[productName].nameSection]: 'Заголовок'
                      },
                      'sequence': [
                        ...attributes.dataItems[productName].formParameters.sequence,
                        localState.newSection[productName].nameSection
                      ],
                    },
                  }
                }
              })
              setLocalState({ 
                ...localState, 'newSection': {
                  ...localState.newSection, [productName]: {
                    'editSection': {
                      ...localState.newSection[productName].editSection,
                      [localState.newSection[productName].nameSection]: ''
                    },
                    'nameSection': '',
                    'nemeOneParametersSection': '',
                  }
                }
              })
            }}>Добавить новую секция</Button>
        </PanelRow>
      </PanelBody>
    </PanelBody>
  })
  return (
    <InspectorControls>
      <PanelBody title={__('dev')} initialOpen={true}>
        <PanelRow>
          <Button 
            isPrimary
            onClick={() => console.log(localState)}>localStateControls</Button>
          <Button 
            isPrimary
            onClick={() => console.log(attributes)}>State</Button>
        </PanelRow>
      </PanelBody>
      <PanelBody title={__('main')} initialOpen={false}>
        <PanelRow>
          <TextControl
            label='max Col To Row'
            type="number"
            value={attributes.maxColToRow}
            onChange={text =>{
              setAttributes({'maxColToRow': +text})
            }}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label='New Product'
            type="text"
            value={localState.newProduct}
            onChange={text => {setLocalState({ ...localState, 'newProduct': text })}}
          />
        </PanelRow>
        <PanelRow>
          <Button 
            isPrimary
            onClick={() => {
              setLocalState({
                ...localState,
                'newSection': {
                  ...localState.newSection,
                  [localState.newProduct]: {
                    'nameSection': '',
                    'nemeOneParametersSection': '',
                    'editSection': {},
                  }
                },
              })
              setAttributes({
                ...attributes, 'dataItems': {
                  ...attributes.dataItems, [localState.newProduct]: {
                    'form': {},
                    'formParameters': {
                      'formTitle': {},
                      'sequence': [],
                    },
                    'productImg': "http://qnimate.com/wp-content/uploads/2014/03/images2.jpg",
                    'productName': "Заголовок",
                  }
                }
              })
            }}>Добавить новый продукт</Button>
        </PanelRow>
      </PanelBody>
      {buildSectionProducts}
    </InspectorControls>
  )
}

export default Controls
