// api进行统一管理
import requests from './request'

// 引入mockjs的配置文件
import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList    get 无参数
// export default reqCreatgoryList=()=>{
//     return requests({url:'/api/product/getBaseCategoryList',method:'get'})
// }

// 简写
export const reqCreatgoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'})

// 利用mockjs来获取轮播图的数据
export const reqGetBannerList=()=>mockRequests({url:'/mock/banner',method:'get'})

// 利用mockjs来获取floor的数据
export const reqGetFloorList=()=>mockRequests({url:'/mock/floor',method:'get'})

// search的接口

export const reqGetSearchInfo=(params)=>requests({url:'/list',method:'post',data:params})


// 商品详情的接口
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'})

// 添加购物车接口/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqShoopCarInfo=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 购物车列表接口
export const reqShoopCartList=()=>requests({url:`/cart/cartList`,method:'get'})

// 删除购物车数据 /api/cart/deleteCart/{skuId}

export const delShoopListOne=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})


// 切换购物车商品状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheck=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获得随记验证码/api/user/passport/sendCode/phone  GET
export const reqPhoneNumber=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 获取注册/api/user/passport/register post  phone,password,code
export const reqRegister=(data)=>requests({url:`/user/passport/register`,data,method:'post'})

// 登录接口 /api/user/passport/login post
export const reqLogin=(data)=>requests({url:`/user/passport/login`,data,method:'post'})

// 获取用户信息 /api/user/passport/auth/getUserInfo get
export const getUserInfo=()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'})

// 退出登录/api/user/passport/logout
export const loginOut=()=>requests({url:`/user/passport/logout`,method:'get'})

// 收货人列表： /api/user/userAddress/auth/findUserAddressList
export const getAddressList=()=>requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'})

// 获取商品订单列表 /api/order/auth/trade  get
export const getOrderInfo=()=>requests({url:`/order/auth/trade`,method:'get'})

// 提交订单接口  /api/order/auth/submitOrder?tradeNo={tradeNo}     POST
export const reqSubmit=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 订单支付  /api/payment/weixin/createNative/{orderId}  get
export const getPay=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 查询支付状态   // /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})




