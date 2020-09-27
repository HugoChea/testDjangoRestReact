from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
#from .serializers import UserSerializer
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist


class Register(APIView):

    def post(self, request) :
        required_params = ['username', 'password', 'email']
        try :
            data = request.data

            if all(key in data for key in required_params) :
                try :
                    username = self.checkRegisteredUsername(data[required_params[0]])
                    password = self.checkRegisteredPassword(data[required_params[1]])
                    email = self.checkRegisteredEmail(data[required_params[2]])
                except ValidationError as err :
                    return Response({"error": str(err.messages[0])}, status=status.HTTP_400_BAD_REQUEST)

                user = User()
                user.username = username
                user.password = make_password(password)
                user.email = email
                user.save()

                return Response({"status": "Success"}, status=status.HTTP_201_CREATED)
            else :
                return Response({"error": "Required param(s) missing, Please include and retry again"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as ex :
            print("Unexpected exception occurred: "+str(ex))
            return Response({"error": "Unexpected error" + str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def checkRegisteredUsername(value) :
        if value is not None and type(value) == str and len(value) > 0:
            if User.objects.filter(username=value).exists():
                raise ValidationError('Username already taken, please try with a different username')
            return value
        else:
            raise ValidationError('Invalid username, it can\'t be empty')

    @staticmethod
    def checkRegisteredPassword(value) :
        if value is not None and type(value) == str and len(value) > 0:
            return value
        else:
            raise ValidationError('Invalid Password, password cannot be null')

    @staticmethod
    def checkRegisteredEmail(value) :
        if value is not None and type(value) == str and len(value) > 0:
            if User.objects.filter(email=value).exists():
                raise ValidationError('E-mail already in use, please try logging in instead')
            return value
        else:
            raise ValidationError('Invalid Email')

class Login(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id': user.pk,
            'username': user.username,
            'email' : user.email,
        })


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserProfile(APIView) : 
    permission_classes = (IsAuthenticated,)

    def put(self, request, user_id) :
        try : 
            data = request.data
            user = User.objects.filter(id = user_id)

            user.update(**data)
            u = User.objects.get(id=user_id)
            serializer = UserSerializer(u)
            return Response({'user': serializer.data}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as ex:
            return Response({'error': 'Something terrible went wrong' + str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
