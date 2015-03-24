#NOTE: THIS FILE IS HOSTED INTO THE EC2 INSTANCE 'i-6d4d9c9b'. I'M EDITING IT DIRECTLY THROUGH SSH

import boto
import boto.ec2

from flask import Flask, Response, json, request
app = Flask( __name__, static_url_path='/static' )

@app.route("/ec2_data.js")
def ec2_data():
  conn = boto.ec2.connect_to_region('us-west-2')

  instances = conn.get_all_reservations()[0].instances

  data = []

  for inst in instances:
    data.append( {'id': inst.id, 'state': inst.state, 'launch_time': inst.launch_time, 'placement' : inst.placement} )

  res = json.dumps(data)

  cb = request.args.get('cb', '')
  if "" != cb:
    res = cb + "(" + res + ");"

  return Response( res,  mimetype='application/json' )


@app.route("/index.html")
def index():
	return app.send_static_file('index.html')


@app.route("/widget.js")
def widget():
  return app.send_static_file('widget.js')

if __name__ == "__main__":
	app.run( host='0.0.0.0' )
