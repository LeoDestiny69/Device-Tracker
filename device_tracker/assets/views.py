from rest_framework import viewsets, permissions
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
        date = self.request.query_params.get('date')

        if code:
            queryset = queryset.filter(code__icontains=code)
        if type_param:
            queryset = queryset.filter(type__icontains=type_param)
        if name:
            queryset = queryset.filter(name__icontains=name)
        if date:
            queryset = queryset.filter(purchase_date=date)

        return queryset
