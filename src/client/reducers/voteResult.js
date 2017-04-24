import { fromJS } from 'immutable'
// import * as actions from 'actions/voteResult'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    default:
      return state
  }
}

const initState = {
  list: [
    {
      type: '精选沙发',
      items : [
        {
          pics: [
            '//img.ljcdn.com/lmall/18b79305-e61b-46cc-bc69-a296a7f1b4e9.jpg.738x392.jpg'
          ],
          title: '双层小车儿童铁艺床',
          description: '为孩子量身打造酷车世界，这里可以是两行文字',
          votePerc: 0.666666666666,
          voteCount: '123'
        },
        {
          pics: [
            '//img.ljcdn.com/lmall/18b79305-e61b-46cc-bc69-a296a7f1b4e9.jpg.738x392.jpg',
            '//img.ljcdn.com/lmall/5dd8d599-6d98-4055-8227-819373619cdb.jpg.738x392.jpg',
          ],
          title: '双层小车儿童铁艺床',
          description: '为孩子量身打造酷车世界，这里可以是两行文字',
          votePerc: 0.2,
          voteCount: '40'
        }
      ]
    },
    {
      type: '实木桌椅',
      items : [
        {
          pics: [
            '//img.ljcdn.com/lmall/5dd8d599-6d98-4055-8227-819373619cdb.jpg.738x392.jpg',
            '//img.ljcdn.com/lmall/18b79305-e61b-46cc-bc69-a296a7f1b4e9.jpg.738x392.jpg'
          ],
          title: '双层校车儿童铁艺床',
          description: '为孩子量身打造酷车世界，这里可以是两行文字',
          votePerc: 0.5,
          voteCount: '70'
        }
      ]
    }
  ],


}
