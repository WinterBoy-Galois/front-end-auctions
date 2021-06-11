import React, { forwardRef } from 'react'
import windowSize from 'react-window-size'
import styles from './styles.module.scss'
import MapItem from '../../components/magazines/common/MapItem'
import ViewerSwitch from '../../components/magazines/common/ViewerSwitch'
import ViewerSwitchMobile from '@components/magazines-mobile/common/ViewerSwitch'

const mapList = [
  {
    issueId: '1',
    content: [
      {
        pageNum: 0,
        x: '65',
        y: '5',
        rotate: '30',
      },
      {
        pageNum: 7,
        x: '10',
        y: '20',
        rotate: '10',
      },
      {
        pageNum: 13,
        x: '5',
        y: '70',
        rotate: '5',
      },
      {
        pageNum: 21,
        x: '30',
        y: '10',
        rotate: '0',
      },
      {
        pageNum: 29,
        x: '44',
        y: '20',
        rotate: '-10',
      },
      {
        pageNum: 35,
        x: '57',
        y: '30',
        rotate: '20',
      },
      {
        pageNum: 43,
        x: '80',
        y: '25',
        rotate: '-16',
      },
      {
        pageNum: 49,
        x: '55',
        y: '75',
        rotate: '0',
      },
      {
        pageNum: 51,
        x: '70',
        y: '39',
        rotate: '-50',
      },
      {
        pageNum: 57,
        x: '18',
        y: '60',
        rotate: '-10',
      },
      {
        pageNum: 63,
        x: '88',
        y: '7',
        rotate: '-10',
      },
      {
        pageNum: 69,
        x: '23',
        y: '40',
        rotate: '20',
      },
      {
        pageNum: 73,
        x: '32',
        y: '72',
        rotate: '-20',
      },
      {
        pageNum: 79,
        x: '45',
        y: '50',
        rotate: '10',
      },
      {
        pageNum: 81,
        x: '85',
        y: '70',
        rotate: '10',
      },
      {
        pageNum: 87,
        x: '70',
        y: '60',
        rotate: '-15',
      }
    ]
  },
  {
    issueId: '2',
    content: [
      {
        pageNum: 0,
        x: '65',
        y: '5',
        rotate: '-30',
      },
      {
        pageNum: 3,
        x: '10',
        y: '20',
        rotate: '-18',
      },
      {
        pageNum: 7,
        x: '5',
        y: '70',
        rotate: '15',
      },
      {
        pageNum: 11,
        x: '30',
        y: '10',
        rotate: '20',
      },
      {
        pageNum: 23,
        x: '44',
        y: '20',
        rotate: '-5',
      },
      {
        pageNum: 29,
        x: '57',
        y: '30',
        rotate: '0',
      },
      {
        pageNum: 35,
        x: '80',
        y: '25',
        rotate: '-12',
      },
      {
        pageNum: 39,
        x: '55',
        y: '75',
        rotate: '0',
      },
      {
        pageNum: 49,
        x: '70',
        y: '39',
        rotate: '-40',
      },
      {
        pageNum: 54,
        x: '18',
        y: '60',
        rotate: '-10',
      },
      {
        pageNum: 59,
        x: '88',
        y: '7',
        rotate: '-15',
      },
      {
        pageNum: 66,
        x: '23',
        y: '40',
        rotate: '22',
      },
      {
        pageNum: 81,
        x: '32',
        y: '72',
        rotate: '-17',
      },
      {
        pageNum: 89,
        x: '45',
        y: '50',
        rotate: '9',
      },
      {
        pageNum: 93,
        x: '85',
        y: '70',
        rotate: '11',
      },
      {
        pageNum: 136,
        x: '70',
        y: '60',
        rotate: '-12',
      }
    ]
  }
]

const MapViewer = forwardRef((props, ref) => {
  const { issueId, windowWidth, onClickItem, onSwitchViewer } = props
  const currentMap = mapList.find(item => item.issueId === issueId)
  const width = window.innerWidth
  return (
    <>
      <div className={styles.mapViewerWrapper}>
        <div className={styles.contentWrapper}>
          <img src='./magazine/digi_fizzy_map.jpg' alt='map-background' className={styles.mapImage}/>
          {
            currentMap && currentMap.content && 
            currentMap.content.map((item, index) => {
              return (
                <MapItem
                  key={index}
                  windowWidth={windowWidth}
                  itemData={item}
                  issueId={issueId}
                  onClick={() => {
                    onClickItem(item.pageNum)
                  }}
                />
              )
            })
          }
        </div>
      </div>
      {
        width < 768 ?
        <ViewerSwitchMobile 
          mapSwitch
          viewers={['webview', 'magazineview', 'exit']}
          onSwitchViewer={onSwitchViewer}
        /> :
          <ViewerSwitch 
          mapSwitch
          viewers={['webview', 'magazineview', 'exit']}
          onSwitchViewer={onSwitchViewer}
        />
      }
    </>
  )
})

export default windowSize(MapViewer)