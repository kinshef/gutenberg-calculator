// Import external components
import Controls from './components/Controls'
import { Card } from './components/Card'
import './style.scss';


const { __ } = wp.i18n // Import __() from wp.i18n
const { registerBlockType } = wp.blocks // Import registerBlockType() from wp.blocks
import { Fragment } from '@wordpress/element'
const { InnerBlocks } = wp.blockEditor


registerBlockType('calculator/calculator-main', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __('Calculator'), // Block title.
  icon: 'cart', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [__('Calculator')],
  attributes: {
    maxColToRow: {
      type: 'number',
      default: 2,
    },
    bootstrapGrid: {
      type: 'bool',
      default: true,
    },
    dataItems: {
      type: 'Object',
      default: {
        "product1": {
            'form': {
              "1as": {
                "d1as": 2601,
                "d2": 3502,
                "d3": 4403,
              },
              "2": {
                "d1as": 2602,
                "d2": 3503,
                "d3": 4404,
              },
              "3": {
                "d1as": 2603,
                "d2": 3504,
                "d3": 4405,
              },
              "4": {
                "d1as": 2604,
                "d2": 3505,
                "d3": 4406,
              },
            },
          'formParameters': {
            'sequence': ['length', 'dugi'],
            'formTitle': {
              'length': 'Длина (метров)',
              'dugi': 'Дug (метров)',
            },
          },
          'productName': 'asd1',
          'productImg': 'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg',
        },
        "product2": {
          'form': {
            "1": 260,
            "2": 350,
            "3": 440,
            "4": 530,
          },
          'formParameters': {
            'sequence': ['length'],
            'formTitle': {
              'length': 'Длина (метров)',
            },
          },
          'productName': 'asd2',
          'productImg': 'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg',
        },
      }
    },
  },
  edit: ({ attributes, setAttributes, className }) => (
    <Fragment>
      <Controls attributes={attributes} setAttributes={setAttributes} />
      
      <section additionalClasses={attributes.className ? attributes.className : ''}
        id='section-catalog' 
        className={className?className+' ':''+'section-catalog'}
        preventClick={true}
      >
        <Card.BootstrapContainer bootstrapGrid={attributes.bootstrapGrid}>
          {/* <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
            <Card.BootstrapCol bootstrapGrid={attributes.bootstrapGrid}>
              <InnerBlocks />
            </Card.BootstrapCol>
          </Card.BootstrapRow> */}
          {Object.keys(attributes.dataItems).length
          ? <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
              <Card.BuildSectionCalc dataItems={attributes.dataItems} maxColToRow={attributes.maxColToRow} />
            </Card.BootstrapRow>
          : <div>Заполните хотя-бы одну секцию</div>}
        </Card.BootstrapContainer>
      </section>
    </Fragment>
  ),
  save: ({ attributes, className }) => (
    <section id='section-catalog'
      additionalClasses={attributes.className ? attributes.className : ''}
      className={className?className+' ':''+'section-catalog'} 
    >
      <Card.BootstrapContainer bootstrapGrid={attributes.bootstrapGrid}>
        {/* <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
          <Card.BootstrapCol bootstrapGrid={attributes.bootstrapGrid}>
            <InnerBlocks.Content />
          </Card.BootstrapCol>
        </Card.BootstrapRow> */}
        {Object.keys(attributes.dataItems).length
        ? <Card.BootstrapRow bootstrapGrid={attributes.bootstrapGrid}>
            <Card.BuildSectionCalc dataItems={attributes.dataItems} maxColToRow={attributes.maxColToRow} />
          </Card.BootstrapRow>
        : <div>Заполните хотя-бы одну секцию</div>}
      </Card.BootstrapContainer>
    </section>
  ),
})
