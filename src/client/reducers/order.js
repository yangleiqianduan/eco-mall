import { fromJS } from 'immutable'
import * as actions from 'actions/order'

export default (state = fromJS(initState), action) => {
  switch (action.type) {
    case actions.UPDATE_ORDER_DETAIL:
      return state.merge({data: action.payload})
    default:
      return state
  }
}

const initState = {
  data: {
        "orderId": "095827146040",
        "type": 0,
        "statusCode": 500,
        "status": "交易关闭",
        "createTime": 1493970170000,
        "countDown": 0,
        "itemsList": [
            {
                "skuId": 100123411111,
                "skuCode": "aaa",
                "title": "58同",
                "url": "http://img.58cdn.com.cn/ui6/index/logo.gif",
                "quantity": 1,
                "realPrice": 20,
                "marketPrice": 20,
                "saleAttributes": [
                    {
                        "key": "颜色",
                        "value": "绿色"
                    }
                ]
            },
            {
                "skuId": 100123411112,
                "skuCode": "aaa",
                "title": "58同",
                "url": "http://img.58cdn.com.cn/ui6/index/logo.gif",
                "quantity": 1,
                "realPrice": 20,
                "marketPrice": 20,
                "saleAttributes": [
                    {
                        "key": "颜色",
                        "value": "绿色"
                    }
                ]
            },
            {
                "skuId": 100123411113,
                "skuCode": "aaa",
                "title": "58同",
                "url": "http://img.58cdn.com.cn/ui6/index/logo.gif",
                "quantity": 1,
                "realPrice": 20,
                "marketPrice": 20,
                "saleAttributes": [
                    {
                        "key": "颜色",
                        "value": "绿色"
                    }
                ]
            }
        ],
        "payInfo": {
            "payMethod": "支付宝",
            "totalProductAmount": 10,
            "totalTmsAmount": 100,
            "totalAmount": 10,
            "payAmount": 10,
            "currencyCode": 0
        },
        "operationList": []
    }
}
