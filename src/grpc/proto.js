import grpc from 'grpc'

const PROTO_PATH = __dirname + '/index.proto'

const { helloPkg } = grpc.load(PROTO_PATH)

export default helloPkg
