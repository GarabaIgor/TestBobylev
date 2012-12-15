from django.db import models

class question(models.Model):
	question = models.TextField()
	wrong_ans1 = models.TextField()
	wrong_ans2 = models.TextField()
	wrong_ans3 = models.TextField()
	wrong_ans4 = models.TextField()
	correct_ans = models.TextField()
	

	def __unicode__(self):
		return self.question

