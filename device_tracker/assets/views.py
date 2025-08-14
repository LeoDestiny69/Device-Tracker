from rest_framework import viewsets, permissions
from django.utils.dateparse import parse_date
from .models import Asset
from .serializers import AssetSerializer

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all().order_by('-created_at')
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        code = self.request.query_params.get('code')
        type_param = self.request.query_params.get('type')
        name = self.request.query_params.get('name')
        purchase_date = self.request.query_params.get('purchase_date')
        created_date = self.request.query_params.get('created_date')

        if code and code.strip():  
            try:
                code_int = int(code)
                queryset = queryset.filter(code=code_int)
            except ValueError:
                pass

        if type_param and type_param.strip():
            queryset = queryset.filter(type__icontains=type_param)

        if name and name.strip():
            queryset = queryset.filter(name__icontains=name)

        if purchase_date and purchase_date.strip():
            parsed_date = parse_date(purchase_date)
            if parsed_date:
                queryset = queryset.filter(purchase_date__date=parsed_date)

        if created_date and created_date.strip():
            parsed_date = parse_date(created_date)
            if parsed_date:
                queryset = queryset.filter(created_at__date=parsed_date)

        return queryset
