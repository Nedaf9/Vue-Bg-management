# -*- coding: utf-8 -*-
import flask, json
from flask import request
from flask import Flask
from flask_cors import cross_origin

from tencentcloud.common import credential
from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
# 导入 SMS 模块的client models
from tencentcloud.sms.v20190711 import sms_client, models

# 导入可选配置类
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile

INSTALLED_APPS = (
  'corsheaders',
)
MIDDLEWARE = [
  'corsheaders.middleware.CorsMiddleware', #最好添加至第一行
]

CORS_ORIGIN_WHITELIST = (

'localhost:8080',


)

CORS_ORIGIN_ALLOW_ALL = True


# 创建一个服务，把当前这个python文件当做一个服务
app = Flask(__name__)
# server.config['JSON_AS_ASCII'] = False
# @server.route()可以将普通函数转变为服务 登录接口的路径、请求方式
@app.route('/code', methods=['GET','POST'])


def login():
  # if request.method == 'POST':
 # 获取通过url请求传参的数据
 Phone = request.form.get("Phone")
 Code = request.form.get("Code")
 print ('Phone')
 # 获取url请求传的密码，明文
 try:
 # 必要步骤：
 # 实例化一个认证对象，入参需要传入腾讯云账户密钥对 secretId 和 secretKey
 # 本示例采用从环境变量读取的方式，需要预先在环境变量中设置这两个值
 # 您也可以直接在代码中写入密钥对，但需谨防泄露，不要将代码复制、上传或者分享给他人
 # CAM 密钥查询：https://console.cloud.tencent.com/cam/capi
     cred = credential.Credential("AKIDDBub3vFl6DZfaGe26B0cy6yb7d1Arcvy", "zkEgy1pIWUBdQy291tWhlYooZ5uVt1u4")
     # cred = credential.Credential(
     #     os.environ.get(""),
     #     os.environ.get("")
     # )
     # 实例化一个 http 选项，可选，无特殊需求时可以跳过
     httpProfile = HttpProfile()
     httpProfile.reqMethod = "POST"  # POST 请求（默认为 POST 请求）
     httpProfile.reqTimeout = 30    # 请求超时时间，单位为秒（默认60秒）
     httpProfile.endpoint = "sms.tencentcloudapi.com"  # 指定接入地域域名（默认就近接入）
     # # 非必要步骤:
     # # 实例化一个客户端配置对象，可以指定超时时间等配置
     clientProfile = ClientProfile()
     clientProfile.signMethod = "TC3-HMAC-SHA256"  # 指定签名算法
     clientProfile.language = "en-US"
     clientProfile.httpProfile = httpProfile
     client = sms_client.SmsClient(cred, "ap-guangzhou", clientProfile)
     req = models.SendSmsRequest()
     req.SmsSdkAppid = "1400464331"
     # # 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，可登录 [短信控制台] 查看签名信息
     req.Sign = "JiuKey"
     # 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper]
     req.ExtendCode = ""
     # 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回
     req.SessionContext = "xxx"
     # 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper]
     req.SenderId = ""
     # 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
     # 例如+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号
     req.PhoneNumberSet = [Phone]
     # 模板 ID: 必须填写已审核通过的模板 ID，可登录 [短信控制台] 查看模板 ID
     req.TemplateID = "818049"
     # 模板参数: 若无模板参数，则设置为空
     req.TemplateParamSet = [Code]
     # # 通过 client 对象调用 SendSms 方法发起请求。注意请求方法名与请求对象是对应的
     resp = client.SendSms(req)
     # 输出 JSON 格式的字符串回包
     print(resp.to_json_string(indent=2))
     return  Phone 

 except TencentCloudSDKException as err:
     print(err)
 return  'success'

if __name__ == '__main__':
    app.run(debug=True, port=8888, host='127.0.0.1')# 指定端口、host,0.0.0.0代表不管几个网卡，任何ip都可以访问

