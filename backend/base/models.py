from django.db import models
from django.contrib.auth.models import User
import uuid
import io
from PIL import Image
from django.core.files.base import ContentFile
from django.db.models.fields.files import ImageFieldFile

class WEBPFieldFile(ImageFieldFile):
    def save(self, name, content, save=True):
        content.file.seek(0)
        image = Image.open(content.file)
        image_bytes = io.BytesIO()
        image.save(fp=image_bytes, format="WEBP")
        image_content_file = ContentFile(content=image_bytes.getvalue())
        super().save(name, image_content_file, save)

class WEBPField(models.ImageField):
    attr_class = WEBPFieldFile

def image_folder(instance, filename):
    return 'smimg-{}.webp'.format(uuid.uuid4().hex)

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=False, blank=False)
    image = WEBPField(verbose_name=("Image"), upload_to=image_folder, null=True, blank=True)
    description = models.TextField(null=False, blank=False)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name + " | " + str(self.createdAt)[0:10]
    